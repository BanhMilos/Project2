import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

const ImageHolder = ({ uri }) => {
  const [source, setSource] = useState();
  useEffect(() => {
    setSource(uri);
  }, [uri]);
  return (
    <View style={styles.holder}>
      <Image style={styles.image} source={{ source }} />
    </View>
  );
};

export default ImageHolder;

const styles = StyleSheet.create({
  holder: {
    backgroundColor: "gray",
    flex: 0.4,
    marginBottom: 20,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
  },
});
