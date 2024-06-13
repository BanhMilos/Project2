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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={{ backgroundColor: item.color, flex: 1 }}>
      <SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16 }}>
        <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
        </Pressable>
        <Pressable
          onPress={handleHeartPress}
          disabled={heartLoading}
          style={{ alignItems: "center", justifyContent: "center" }}
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
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          marginTop: 140,
          borderTopLeftRadius: 56,
          borderTopRightRadius: 56,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            //backgroundColor: "red",
            height: 280,
            width: 280,
            position: "absolute",
            top: -150,
            // marginBottom: 130,
          }}
        >
          <Image
            defaultSource={require("../../assets/loading.png")}
            source={{ uri: item.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              borderRadius: 150,
              borderWidth: 3,
              borderColor: "gray",
            }}
          />
        </View>

        {/* Recipe Name */}
        <Text style={{ marginTop: 150, fontSize: 28, fontWeight: "bold" }}>
          {item.name}
        </Text>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Recipe Description */}
            <Text style={{ fontSize: 20, marginVertical: 16 }}>
              {item.description}
            </Text>

            {/* Recipe Extra Details */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // width: "100%",
                // backgroundColor: "green",
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.38)",
                  // paddingHorizontal: 16,
                  paddingVertical: 26,
                  borderRadius: 8,
                  alignItems: "center",
                  width: 100,
                }}
              >
                <Text style={{ fontSize: 40 }}>⏰</Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(135, 206, 235, 0.8)",
                  // paddingHorizontal: 16,
                  paddingVertical: 26,
                  borderRadius: 8,
                  alignItems: "center",
                  width: 100,
                  // marginHorizontal: 24,
                }}
              >
                <Text style={{ fontSize: 40 }}>🥣</Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.difficulty}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(255, 165, 0, 0.48)",
                  // paddingHorizontal: 16,
                  paddingVertical: 26,
                  borderRadius: 8,
                  alignItems: "center",
                  width: 100,
                }}
              >
                <Text style={{ fontSize: 40 }}>🔥</Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.calories}
                </Text>
              </View>
            </View>

            {/* Recipe Ingredients  */}

            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
              >
                Ingredients:
              </Text>

              {item.ingredients.map((ingredient, index) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 4,
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        backgroundColor: "red",
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                      }}
                    ></View>
                    <Text style={{ fontSize: 18, marginLeft: 6 }}>
                      {ingredient}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Recipe Steps */}

            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
              >
                Steps:
              </Text>

              {item.steps.map((step, index) => {
                return (
                  <Text
                    key={index}
                    style={{ fontSize: 18, marginLeft: 6, marginVertical: 6 }}
                  >{`${index + 1} ) ${step}`}</Text>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({});
