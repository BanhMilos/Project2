import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { colors } from "../Constant";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const IngredientsList = ({ searchQuery, handleAdd }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [added, setAdded] = useState();
  const navigation = useNavigation();
  const onAddPress = (index, name) => {
    const newArray = [...added];
    newArray[index] = !newArray[index];
    setAdded(newArray);
    handleAdd(name);
  };
  useEffect(() => {
    const list = db.collection("Ingredient").onSnapshot((querySnapshot) => {
      const ingredients = [];
      querySnapshot.forEach((documentSnapshot) => {
        ingredients.push({
          selected: false,
          ...documentSnapshot.data(),
        });
      });
      setIngredients(ingredients);
      setAdded(Array.from({ length: ingredients.length }, () => false));
      setLoading(false);
    });
    return () => list();
  }, []);
  ingredients.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  const filteredData = ingredients.filter((item) =>
    item.name.includes(searchQuery)
  );
  if (loading) return <ActivityIndicator />;
  return (
    <View
      style={{
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
        //paddingHorizontal: 15,
        //backgroundColor: "red",
      }}
    >
      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("IngredientDetails", { item: item })
            }
            style={{
              backgroundColor: added[index]
                ? colors.COLOR_PRIMARY
                : colors.COLOR_LIGHT,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              alignItems: "center",
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="search"
                color={"gray"}
                style={{ marginLeft: 3 }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "300",
                  color: added[index] ? colors.COLOR_LIGHT : colors.COLOR_DARK,
                }}
              >
                {" " + item.name}
              </Text>
            </View>
            <View
              style={{ zIndex: 2, flexDirection: "row", alignItems: "center" }}
            >
              {/* Information Button*/}
              <Pressable onPress={() => onAddPress(index, item.name)}>
                <Ionicons
                  name={added[index] ? "remove" : "add"}
                  size={25}
                  color={
                    added[index] ? colors.COLOR_LIGHT : colors.COLOR_PRIMARY
                  }
                />
              </Pressable>
            </View>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default IngredientsList;

const styles = StyleSheet.create({});
