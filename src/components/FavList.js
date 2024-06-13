import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { colors } from "../Constant";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FavList = ({ uid }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const handleFav = (value, index) => {
    if (value == true) setList(list.push());
  };
  useEffect(() => {
    const fetchFavList = async () => {
      try {
        const list = [];
        const userDoc = await db.collection("User").doc(uid).get();
        const userList = userDoc.get("favList");
        for (const id of userList) {
          const doc = await db.collection("Recipe").doc(id).get();
          list.push(doc.data());
          console.log(id);
        }
        setList(list);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavList();
  }, [uid]);
  if (loading) return <ActivityIndicator size={"small"} />;
  return (
    <View>
      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("RecipeDetail", {
                item: item,
                index: index,
                handleFav: handleFav,
              })
            }
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

export default FavList;

const styles = StyleSheet.create({});
