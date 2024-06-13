import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import { useNavigation, useRoute } from "@react-navigation/native";
import IngredientsList from "../components/IngredientsList";
import { Feather } from "@expo/vector-icons";

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
    let newList = listName;
    if (index == -1) newList = [...listName, name];
    else {
      newList = listName.filter((item) => item !== name);
    }
    setListName(newList);
  };
  const handleCheck = () => {
    navigation.navigate("Suggest", { listName: listName, uid: uid });
  };
  const handlePress = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress} style={{ zIndex: 1 }}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        {/* render header */}
        <Pressable
          style={{
            flex: 1,
            position: "absolute",
            marginTop: 42,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather name={"chevron-left"} size={28} color="tomato" />
        </Pressable>
        <Pressable onPress={handleCheck}>
          <Header headerText={""} headerIcon={"check"} />
        </Pressable>

        {/* Search Filter */}
        <SearchFilter
          icon="search"
          placeholder={"enter your fav recipe"}
          onSearch={handleSearch}
        />
        <IngredientsList searchQuery={searchQuery} handleAdd={handleAdd} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default IngredientsListScreen;

const styles = StyleSheet.create({});
