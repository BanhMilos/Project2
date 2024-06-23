import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const RecipeListScreen = () => {
  const route = useRoute();
  const { uid } = route.params;
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const navigation = useNavigation();

  const handleCameraPress = () => {
    navigation.navigate("Image");
  };

  const handleFavPress = () => {
    navigation.navigate("FavList", { uid: uid });
  };

  const handleListPress = () => {
    navigation.navigate("IngredientList", { uid: uid });
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} style={styles.touchable}>
      <SafeAreaView style={styles.safeArea}>
        {/* render header */}
        <Header headerText={"Hello there "} headerIcon={"user-o"} />

        {/* Categories filter */}
        <View style={styles.categoriesContainer}>
          {/*<Text style={styles.categoriesTitle}>Categories</Text>*/}
          {/* Categories list */}
          <CategoriesFilter onCategoryChange={handleCategoryChange} />
        </View>

        {/* Recipe List Filter */}
        <View style={styles.recipeListContainer}>
          <View style={styles.recipeListHeader}>
            <Text style={styles.recipeListTitle}>Recipes</Text>
            <View style={styles.recipeListIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleFavPress}
              >
                <FontAwesome name="heart-o" size={25} color={"tomato"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleListPress}
              >
                <Feather name="list" size={25} color={"tomato"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCameraPress}>
                <Feather name="camera" size={25} color={"tomato"} />
              </TouchableOpacity>
            </View>
          </View>
          <RecipeCard category={category} uid={uid} />
        </View>

        {/* Recipes list */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  touchable: {
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    marginHorizontal: 16,
  },
  categoriesContainer: {
    marginTop: 5,
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  recipeListContainer: {
    marginTop: 0,
    flex: 1,
  },
  recipeListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  recipeListTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  recipeListIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginRight: 15,
  },
});
