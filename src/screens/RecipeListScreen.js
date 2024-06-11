import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../../firebase";

const RecipeListScreen = () => {
  const route = useRoute();
  const { uid } = route.params;
  console.log(uid);
  const [userData, setUserData] = useState(null);
  const [category, setCategory] = useState("all");
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  const navigation = useNavigation();
  const handleCameraPress = () => {
    navigation.navigate("Image");
  };
  const handleListPress = () => {
    navigation.navigate("IngredientList");
  };
  const handleSearch = (searchFilterText) => {
    setSearchQuery(searchFilterText);
  };
  const handlePress = () => {
    Keyboard.dismiss();
  };
  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await db.collection("User").doc(user.uid).get();
        if (userDoc.exists) {
          console.log(userDoc);
        } else {
          console.log("no have");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUserData();
  }, [user.uid]);*/
  return (
    <TouchableWithoutFeedback onPress={handlePress} style={{ zIndex: 1 }}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        {/* render header */}
        <Header headerText={"Hello there"} headerIcon={"user-o"} />

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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={handleListPress}
              >
                <Feather name="list" size={25} color={"tomato"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCameraPress}>
                <Feather name="camera" size={25} color={"tomato"} />
              </TouchableOpacity>
            </View>
          </View>
          <RecipeCard category={category} />
        </View>

        {/* Recipes list */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({});
