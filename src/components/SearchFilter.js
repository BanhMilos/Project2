import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchFilter = ({ icon, placeholder, onSearch, onFocus }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const textInputRef = useRef(null);
  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
      if (searchQuery) onFocus(true);
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    query.trim() != "" ? onFocus(true) : onFocus(false);
    onSearch(query);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
    onFocus(false);
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        paddingVertical: 16,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
      }}
      onPress={focusTextInput}
      activeOpacity={0.7}
    >
      <FontAwesome name={icon} size={20} color="#f96163" />
      <TextInput
        style={{ paddingLeft: 8, fontSize: 16, color: "#808080", flex: 1 }}
        placeholder={placeholder}
        autoCapitalize="words"
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
        ref={textInputRef}
        onPressIn={() => {
          if (searchQuery) onFocus(true);
        }}
      />
      {searchQuery ? (
        <TouchableOpacity onPress={clearSearchQuery} style={{ marginLeft: 10 }}>
          <FontAwesome
            name="close"
            size={20}
            color={searchQuery ? "gray" : "white"}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({});
