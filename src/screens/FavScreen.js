import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import { useNavigation, useRoute } from "@react-navigation/native";
import IngredientsList from "../components/IngredientsList";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { db } from "../../firebase";

const FavScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const route = useRoute();
  const { uid } = route.params;
  const navigation = useNavigation();
  const handleSearch = (searchFilterText) => {
    setSearchQuery(searchFilterText);
  };
  const handlePress = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    const fetchFavList = async () => {
      try {
        const docRef = await db.collection("User").doc(uid).get();
        const favList = await docRef.get("favList");
        setList(favList);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchFavList();
    setLoading(false);
  }, []);
  return (
    <TouchableWithoutFeedback onPress={handlePress} style={{ zIndex: 1 }}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        {/* render header */}
        <Pressable
          style={{
            flex: 1,
            position: "absolute",
            marginTop: 42,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather name={"chevron-left"} size={28} color="tomato" />
        </Pressable>
        <Header headerText={""} headerIcon={"user-o"} />

        {/* Search Filter */}
        <SearchFilter
          icon="search"
          placeholder={"enter your fav recipe"}
          onSearch={handleSearch}
        />
        <IngredientsList searchQuery={searchQuery} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FavScreen;

const styles = StyleSheet.create({});
