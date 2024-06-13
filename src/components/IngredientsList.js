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

const IngredientsList = ({ searchQuery, favourited, handleFav }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [added, setAdded] = useState(false);
  const navigation = useNavigation();
  const handleAdd = () => {
    setAdded(!added);
    console.log(added);
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
        paddingVertical: 0,
        borderRadius: 8,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        //backgroundColor: "red",
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
              marginVertical: 5,
              alignItems: "center",
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="search"
                color={"gray"}
                style={{ marginLeft: 3 }}
              />

              <Text style={{ fontSize: 16, fontWeight: "300" }}>
                {" " + item.name}
              </Text>
            </View>
            <View
              style={{ zIndex: 2, flexDirection: "row", alignItems: "center" }}
            >
              {/* Information Button*/}
              <Pressable onPress={handleAdd}>
                <Ionicons
                  name={added ? "remove" : "add"}
                  size={25}
                  color={"tomato"}
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
