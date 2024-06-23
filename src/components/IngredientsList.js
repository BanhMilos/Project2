import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { colors } from "../Constant";

const IngredientsList = ({ searchQuery, handleAdd }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [added, setAdded] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = db
      .collection("Ingredient")
      .onSnapshot((querySnapshot) => {
        const ingredients = [];
        querySnapshot.forEach((documentSnapshot) => {
          ingredients.push({
            selected: false,
            ...documentSnapshot.data(),
          });
        });
        ingredients.sort((a, b) => a.name.localeCompare(b.name));
        setIngredients(ingredients);
        setAdded(Array.from({ length: ingredients.length }, () => false));
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const onAddPress = (index, name) => {
    const newArray = [...added];
    newArray[index] = !newArray[index];
    setAdded(newArray);
    handleAdd(name);
  };

  const filteredData = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigation.navigate("IngredientDetails", { item })}
            style={[
              styles.pressableContainer,
              {
                backgroundColor: added[index]
                  ? colors.COLOR_PRIMARY
                  : colors.COLOR_LIGHT,
              },
            ]}
          >
            <View style={styles.itemContainer}>
              <FontAwesome
                name="search"
                color="gray"
                style={styles.searchIcon}
              />
              <Text
                style={[
                  styles.itemText,
                  {
                    color: added[index]
                      ? colors.COLOR_LIGHT
                      : colors.COLOR_DARK,
                  },
                ]}
              >
                {item.name}
              </Text>
            </View>
            <Pressable onPress={() => onAddPress(index, item.name)}>
              <Ionicons
                name={added[index] ? "remove" : "add"}
                size={25}
                color={added[index] ? colors.COLOR_LIGHT : colors.COLOR_PRIMARY}
              />
            </Pressable>
          </Pressable>
        )}
        keyExtractor={(item) => item.id} // Use a unique key for each item
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 150,
    zIndex: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  pressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.COLOR_LIGHT,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginVertical: 3,
    marginRight: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "300",
  },
});

export default IngredientsList;
