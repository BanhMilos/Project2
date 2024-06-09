import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { categories, colors } from "../Constant";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";

const RecipeCard = ({ category }) => {
  //fetch data from firestore
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const list = db.collection("Recipe").onSnapshot((querySnapshot) => {
      const recipes = [];
      querySnapshot.forEach((documentSnapshot) => {
        recipes.push({
          ...documentSnapshot.data(),
        });
      });
      setRecipes(recipes);
      setLoading(false);
    });
    return () => list();
  }, []);
  if (loading) return <ActivityIndicator />;
  const filteredData =
    category == "all"
      ? recipes
      : recipes.filter((item) => item.categories.includes(category));
  /////////////////
  return (
    <View>
      <FlatList
        data={filteredData}
        extraData={categories}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("RecipeDetail", { item: item })}
            style={{
              backgroundColor: colors.COLOR_LIGHT,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 7,
              borderRadius: 16,
              marginVertical: 16,
              alignItems: "center",
              paddingHorizontal: 8,
              paddingVertical: 26,
            }}
          >
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={{ width: 150, height: 150, resizeMode: "center" }}
            />
            <Text>{item.name}</Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text>{item.time}</Text>
              <Text> | </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 4 }}>{item.rating}</Text>
                <FontAwesome
                  name="star"
                  size={16}
                  color={colors.COLOR_PRIMARY}
                />
              </View>
            </View>
          </Pressable>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({});
