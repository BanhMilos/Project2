import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { colors } from "../Constant";

const RecipeCard = ({ category, uid }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("Recipe").onSnapshot((querySnapshot) => {
      const recipes = [];
      querySnapshot.forEach((documentSnapshot) => {
        recipes.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setRecipes(recipes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <ActivityIndicator />;

  const filteredData =
    category === "all"
      ? recipes
      : recipes.filter((item) => item.categories.includes(category));

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("RecipeDetail", { item, uid })}
            style={styles.cardContainer}
          >
            <Image
              defaultSource={require("../../assets/loading.png")}
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.rating}>
                {item.rating}{" "}
                <FontAwesome
                  name="star"
                  size={16}
                  color={colors.COLOR_PRIMARY}
                />
              </Text>
            </View>
          </Pressable>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    backgroundColor: colors.COLOR_LIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    width: "45%",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginRight: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default RecipeCard;
