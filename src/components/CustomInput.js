import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useRef } from "react";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  isDisabled,
}) => {
  const textInputRef = useRef(null);
  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
    console.log("touched");
  };
  console.log(placeholder + " " + isDisabled);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={focusTextInput}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        ref={textInputRef}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //top : 80,
    backgroundColor: "white",
    width: "100%",
    borderColor: "gray",
    borderWidth: 0.4,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 3,
    height: 50,
    justifyContent: "center",
    zIndex: 2,
  },
  input: {
    fontSize: 16,
    zIndex: 1,
  },
});

export default CustomInput;
