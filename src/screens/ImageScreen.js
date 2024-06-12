import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ImageScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
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

        const response = await fetch("http:/192.168.1.2:8000/process-image/", {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          method: "post",
          body: data,
        });
        const respondData = await response.json();
        console.log(respondData);
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
  return (
    <View style={styles.container}>
      <Image
        style={{ flex: 0.5, marginBottom: 10 }}
        source={
          !image
            ? require("../../assets/logo.png")
            : {
                uri: image.uri,
              }
        }
      />
      <Pressable
        style={{ position: "absolute", marginLeft: 15, marginTop: 42 }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
      </Pressable>
      <TouchableOpacity style={styles.button} onPress={() => uploadImage()}>
        <Text style={{ fontSize: 15 }}> Capturing </Text>
      </TouchableOpacity>
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
});
