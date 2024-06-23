import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../../firebase";
import { colors } from "../Constant";

const SuggestRecipe = () => {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { listName, uid } = route.params;

  useEffect(() => {
    console.log(listName);
    fetchList(listName);
  }, []);

  const fetchList = async (ingredientList) => {
    try {
      // Fetch tables contain documents that have ingredient in respond
      const promise = ingredientList.map((ingredient) => {
        return db
          .collection("Recipe")
          .where("ingredients", "array-contains", ingredient)
          .get();
      });

      // Store unique documents id
      const querySnapShots = await Promise.all(promise);
      const uniqueId = new Set();
      querySnapShots.forEach((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          uniqueId.add(doc.id);
        });
      });

      // Fetch documents using id
      const fetchPromises = Array.from(uniqueId).map((id) => {
        return db.collection("Recipe").doc(id).get();
      });

      // Store data
      const docSnapShots = await Promise.all(fetchPromises);
      const result = docSnapShots.map((snapshot) => {
        return snapshot.data();
      });
      setList(result);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name={"chevron-left"} size={28} color="tomato" />
      </Pressable>
      {/* Ingredients List */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {list && (
        <View style={styles.wrapper}>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("RecipeDetail", { item: item, uid: uid })
                }
                style={styles.recipeList}
              >
                <Image
                  defaultSource={require("../../assets/loading.png")}
                  source={{
                    uri: item.imageUrl,
                  }}
                  style={styles.recipeImage}
                />
                <Text>{item.name}</Text>
                <View style={styles.recipeInfo}>
                  <Text>{item.time}</Text>
                  <Text> | </Text>
                  <View style={styles.rating}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
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
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default SuggestRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    position: "absolute",
    marginTop: 42,
    zIndex: 2,
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    marginTop: 75,
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
  recipeImage: {
    width: 150,
    height: 150,
    resizeMode: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  recipeInfo: {
    flexDirection: "row",
    marginTop: 8,
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    marginRight: 4,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
