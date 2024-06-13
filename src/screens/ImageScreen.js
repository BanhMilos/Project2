import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { colors, recipeList } from "../Constant";

const ImageScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [list, setList] = useState(null);
  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let res = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!res.canceled) {
        await saveImage(res);
        var data = new FormData();
        data.append("file", {
          uri: res.uri,
          name: "file.jpg",
          type: "image/jpg",
        });

        const response = await fetch("http:/192.168.1.5:8000/process-image/", {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          method: "post",
          body: data,
        });
        const respondData = await response.json();
        console.log(respondData);
        fetchList(respondData);
      }
    } catch (error) {
      alert(error);
    }
  };
  const saveImage = async (image) => {
    try {
      setImage(image);
    } catch (error) {
      throw error;
    }
  };
  const fetchList = async (ingredientList) => {
    try {
      //Fetch tables contain documents that have ingredient in respond
      const promise = ingredientList.map((ingredient) => {
        return db
          .collection("Recipe")
          .where("ingredients", "array-contains", ingredient)
          .get();
      });

      //Store unique documents id
      const querySnapShots = await Promise.all(promise);
      const uniqueId = new Set();
      querySnapShots.forEach((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          uniqueId.add(doc.id);
        });
      });
      //Fetch documents using id
      const fetchPromises = Array.from(uniqueId).map((id) => {
        return db.collection("Recipe").doc(id).get();
      });

      //store data
      const docSnapShots = await Promise.all(fetchPromises);
      const result = docSnapShots.map((snapshot) => {
        return snapshot.data();
      });
      setList(result);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={uploadImage}>
        <Image
          style={styles.imageHolder}
          source={
            !image
              ? require("../../assets/logo.png")
              : {
                  uri: image.uri,
                }
          }
        />
      </Pressable>
      <Pressable
        style={{ position: "absolute", marginLeft: 15, marginTop: 42 }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
      </Pressable>

      {/* Recipe List*/}
      {list && (
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("RecipeDetail", { item: item })
              }
              style={styles.recipeList}
            >
              <Image
                defaultSource={require("../../assets/loading.png")}
                source={{
                  uri: item.imageUrl,
                }}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "center",
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />
              <Text>{item.name}</Text>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                <Text>{item.time}</Text>
                <Text> | </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 4 }}>{item.rating}</Text>
                  <FontAwesome
                    name="star"
                    size={16}
                    color={colors.COLOR_PRIMARY}
                  />
                </View>
              </View>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 150,
    backgroundColor: "cyan",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  imageHolder: { marginBottom: 10, height: Dimensions.get("window").width },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 350,
  },
  recipeList: {
    backgroundColor: colors.COLOR_LIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 16,
    paddingVertical: 15,
    alignItems: "center",
    paddingHorizontal: 8,
    marginHorizontal: 20,
  },
});
