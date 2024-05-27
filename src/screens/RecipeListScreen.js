import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";

const RecipeListScreen = () => {
  const [category, setCategory] = useState("all");
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      {/* render header */}
      <Header headerText={"Hello there "} headerIcon={"bell-o"} />

      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={"enter your fav recipe"} />

      {/* Categories filter */}

      <View style={{ marginTop: 22 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
        {/* Categories list */}
        <CategoriesFilter onCategoryChange={handleCategoryChange} />
      </View>

      {/* Recipe List Filter */}

      <View style={{ marginTop: 22, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Recipes</Text>
        {/* Recipes list */}

        <RecipeCard category={category} />
      </View>
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({});
