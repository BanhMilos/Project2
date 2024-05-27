import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImageScreen = () => {
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
        console.log(res.uri);
        var data = new FormData();
        data.append("my_photo", {
          uri: res.uri, // your file path string
          name: "my_photo.jpg",
          type: "image/jpg",
        });
      }
    } catch (error) {
      alert("smthing wrong");
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
