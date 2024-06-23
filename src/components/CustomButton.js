import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, bgColor, fgColor, isDisabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.button, bgColor ? { backgroundColor: bgColor } : {}]}
    >
      <Text style={[styles.text, fgColor ? { color: fgColor } : {}]}>
        {" "}
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    //top : 100,
    margin: 5,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    height: 50,
    borderColor: "black",
    borderWidth: 0.3,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
  },
});

export default CustomButton;
