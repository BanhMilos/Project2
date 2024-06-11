import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import React from "react";

const TestingScreen = () => {
  const screenDimension = Dimensions.get("screen");
  const screenHeight = screenDimension.height;
  return <ActivityIndicator style={styles.load} size={"large"} />;
};

export default TestingScreen;

const styles = StyleSheet.create({
  load: {
    position: "absolute",
    color: "red",
    top: Dimensions.get("screen").height / 2,
    alignSelf: "center",
  },
});
