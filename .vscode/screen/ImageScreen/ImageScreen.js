import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const [image, setImage] = useState();

const ImageScreen = ({ uri }) => {
  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let res = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!res.canceled) await saveImage(res.assets[0].uri);
    } catch (error) {}
  };
  const saveImage = async (image) => {
    try {
      setImage(image);
    } catch (error) {
      throw error;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.tinyLogo} source={{ uri }} />
      </View>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={{ fontSize: 20 }}>Capture</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 0.5,
    flexDirection: "row",
  },
  tinyLogo: {
    flex: 1,
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    backgroundColor: "cyan",
    padding: 5,
    justifyContent: "center",
    marginHorizontal: 150,
    borderRadius: 10,
  },
});
