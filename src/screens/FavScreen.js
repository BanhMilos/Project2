import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import FavList from "../components/FavList";

const FavScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params;

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={28} color="tomato" />
        </Pressable>
        <Header headerText="" headerIcon="user-o" />
        <FavList searchQuery={searchQuery} uid={uid} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    marginTop: 42,
    zIndex: 2,
  },
});

export default FavScreen;
