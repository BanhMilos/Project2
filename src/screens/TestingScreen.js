import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const TestingScreen = () => {
  const screenDimension = Dimensions.get("screen");
  const screenHeight = screenDimension.height;
  return (
    <View style={styles.load}>
      <TouchableOpacity
        style={styles.load2}
        disabled={true}
        onPress={() => {
          console.log("touched");
        }}
      >
        <TextInput> what the fuck</TextInput>
      </TouchableOpacity>
    </View>
  );
};

export default TestingScreen;

const styles = StyleSheet.create({
  load: {
    flex: 1,
  },
  load2: {
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
