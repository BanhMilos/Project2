import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RecipeListScreen = () => {
  const [category, setCategory] = useState("all");
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  const navigation = useNavigation();
  const handleCameraPress = () => {
    navigation.navigate("Image");
  };
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      {/* render header */}
      <Header headerText={"Hello there "} headerIcon={"bell-o"} />

      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={"enter your fav recipe"} />

      {/* Categories filter */}

      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
        {/* Categories list */}
        <CategoriesFilter onCategoryChange={handleCategoryChange} />
      </View>

      {/* Recipe List Filter */}

      <View
        style={{
          marginTop: 0,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Recipes</Text>
          <TouchableOpacity onPress={handleCameraPress}>
            <Feather name="camera" size={25} color={"tomato"} />
          </TouchableOpacity>
        </View>
        <RecipeCard category={category} />
      </View>

      {/* Recipes list */}
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({});
