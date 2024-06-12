import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import FavList from "../components/FavList";

const FavScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRoute();
  const { uid } = route.params;
  const navigation = useNavigation();
  const handleSearch = (searchFilterText) => {
    setSearchQuery(searchFilterText);
  };
  const handlePress = () => {
    Keyboard.dismiss();
  };
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

        <FavList searchQuery={searchQuery} uid={uid} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FavScreen;

const styles = StyleSheet.create({});
