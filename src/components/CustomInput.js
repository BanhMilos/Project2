import React, { useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

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
  };

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
        editable={!isDisabled}
        pointerEvents="none"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "gray",
    borderWidth: 0.4,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 3,
    minHeight: 50,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    zIndex: 1,
    pointerEvents: "auto",
  },
});

export default CustomInput;
