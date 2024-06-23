import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SearchFilter from "../components/SearchFilter";
import IngredientsList from "../components/IngredientsList";
import { useNavigation, useRoute } from "@react-navigation/native";

const IngredientsListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listName, setListName] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params;

  const handleSearch = (searchFilterText) => {
    setSearchQuery(searchFilterText);
  };

  const handleAdd = (name) => {
    const index = listName.indexOf(name);
    let newList;
    if (index === -1) {
      newList = [...listName, name]; // Add to list
    } else {
      newList = listName.filter((item) => item !== name); // Remove from list
    }
    setListName(newList);
  };

  const handleCheck = () => {
    navigation.navigate("Suggest", { listName: listName, uid: uid });
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} style={{ zIndex: 2 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonWrapper}>
          {/* Back Button */}
          <Pressable style={styles.button} onPress={handleGoBack}>
            <Feather name="chevron-left" size={28} color="tomato" />
          </Pressable>

          {/* Check Button */}
          <Pressable onPress={handleCheck} style={styles.button}>
            <FontAwesome name={"check"} size={24} color="#f96163" />
          </Pressable>
        </View>

        {/* Search Filter */}
        <SearchFilter
          icon="search"
          placeholder="Enter your favorite recipe"
          onSearch={handleSearch}
        />

        {/* Ingredients List */}
        <IngredientsList searchQuery={searchQuery} handleAdd={handleAdd} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  button: {
    zIndex: 2,
  },
  buttonWrapper: { flexDirection: "row", justifyContent: "space-between" },
});

export default IngredientsListScreen;
