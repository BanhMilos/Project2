import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { recipeList, categories, colors } from "../Constant";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

const IngredientsList = ({ searchQuery, visible }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const navigation = useNavigation();
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
  const filteredData = ingredients.filter((item) =>
    item.name.includes(searchQuery)
  );
  if (visible == true && filteredData.length > 0)
    return (
      <View
        style={{
          position: "absolute",
          marginTop: 150,
          zIndex: 2,
          backgroundColor: "#fff",
          flexDirection: "row",
          paddingVertical: 14,
          borderRadius: 8,
          paddingHorizontal: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
          maxHeight: 430,
          marginHorizontal: 20,
        }}
      >
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("IngredientDetails", { item: item })
              }
              style={{
                backgroundColor: colors.COLOR_LIGHT,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                borderWidth: 0.17,
                marginVertical: 0,
                alignItems: "center",
                paddingHorizontal: 5,
                paddingVertical: 14,
              }}
            >
              <FontAwesome name="search" />
              <Text>{item.name}</Text>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
};

export default IngredientsList;

const styles = StyleSheet.create({});
