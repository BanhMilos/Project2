import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../firebase";

const RecipeDetailsScreen = ({ navigation, route }) => {
  const { item, uid } = route.params;
  const [fav, setFav] = useState(false);
  const [favList, setFavList] = useState();
  const [loading, setLoading] = useState(true);
  const [heartLoading, setHeartLoading] = useState(false);
  const handleHeartPress = async () => {
    const index = favList.indexOf(item.id);
    if (index > -1) {
      favList.splice(index, 1);
    } else {
      favList.push(item.id);
    }
    setHeartLoading(true);
    await db.collection("User").doc(uid).update({ favList });
    setFav((fav) => !fav);
    setHeartLoading(false);
  };
  useEffect(() => {
    const getFav = async () => {
      try {
        const userDoc = await db.collection("User").doc(uid).get();
        const favList = userDoc.get("favList");
        if (favList.includes(item.name)) setFav(true);
        setFavList(favList);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (uid) getFav();
    console.log("RecipeDetailsScreen effect called");
  }, [uid]);
  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: item.color }]}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
        </Pressable>
        <Pressable
          onPress={handleHeartPress}
          disabled={heartLoading}
          style={styles.heartButton}
        >
          {!heartLoading && (
            <FontAwesome
              name={fav ? "heart" : "heart-o"}
              size={28}
              color="white"
            />
          )}
          {heartLoading && <ActivityIndicator />}
        </Pressable>
      </SafeAreaView>
      <View style={styles.detailsContainer}>
        <View style={styles.imageContainer}>
          <Image
            defaultSource={require("../../assets/loading.png")}
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>

        {/* Recipe Name */}
        <Text style={styles.recipeName}>{item.name}</Text>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Recipe Description */}
            <Text style={styles.description}>{item.description}</Text>

            {/* Recipe Extra Details */}
            <View style={styles.extraDetailsContainer}>
              <View
                style={[
                  styles.extraDetail,
                  { backgroundColor: "rgba(255, 0, 0, 0.38)" },
                ]}
              >
                <Text style={styles.extraDetailIcon}>⏰</Text>
                <Text style={styles.extraDetailText}>{item.time}</Text>
              </View>
              <View
                style={[
                  styles.extraDetail,
                  { backgroundColor: "rgba(135, 206, 235, 0.8)" },
                ]}
              >
                <Text style={styles.extraDetailIcon}>🥣</Text>
                <Text style={styles.extraDetailText}>{item.difficulty}</Text>
              </View>
              <View
                style={[
                  styles.extraDetail,
                  { backgroundColor: "rgba(255, 165, 0, 0.48)" },
                ]}
              >
                <Text style={styles.extraDetailIcon}>🔥</Text>
                <Text style={styles.extraDetailText}>{item.calories}</Text>
              </View>
            </View>

            {/* Recipe Ingredients */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Ingredients:</Text>
              {item.ingredients.map((ingredient, index) => (
                <View style={styles.ingredient} key={index}>
                  <View style={styles.ingredientDot}></View>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            {/* Recipe Steps */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Steps:</Text>
              {item.steps.map((step, index) => (
                <Text key={index} style={styles.stepText}>
                  {`${index + 1}) ${step}`}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  heartButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 140,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageContainer: {
    height: 280,
    width: 280,
    position: "absolute",
    top: -150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "gray",
  },
  recipeName: {
    marginTop: 150,
    fontSize: 28,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    marginVertical: 16,
  },
  extraDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  extraDetail: {
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 26,
    width: 100,
  },
  extraDetailIcon: {
    fontSize: 40,
  },
  extraDetailText: {
    fontSize: 20,
    fontWeight: "400",
  },
  section: {
    alignSelf: "flex-start",
    marginVertical: 22,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 6,
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  ingredientDot: {
    backgroundColor: "red",
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  ingredientText: {
    fontSize: 18,
    marginLeft: 6,
  },
  stepText: {
    fontSize: 18,
    marginLeft: 6,
    marginVertical: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeDetailsScreen;
