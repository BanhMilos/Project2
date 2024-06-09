import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../firebase";
import { query } from "firebase/database";
import { DocumentSnapshot } from "firebase/firestore";

const SearchFilter = ({ icon, placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [focus, setFocus] = useState(false);
  const textInputRef = useRef(null);
  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
      setFocus(true);
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };
  const clearSearchQuery = () => {
    setSearchQuery("");
  };
  useEffect(() => {
    const list = db.collection("Ingredient").onSnapshot((querySnapshot) => {
      const ingredients = [];
      querySnapshot.forEach((documentSnapshot) => {
        ingredients.push({
          ...documentSnapshot.data(),
        });
      });
      setIngredients(ingredients);
      setLoading(false);
    });
    return () => list();
  }, []);
  if (loading) return <ActivityIndicator />;
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
