import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Constant";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          item.id != "3" ? styles.buttonDisabled : styles.buttonEnabled,
        ]}
        disabled={item.id != "3"}
        onPress={() => navigation.navigate("RecipeList")}
      >
        <Text
          style={item.id != "3" ? styles.titleDisabled : styles.titleEnabled}
        >
          Getting started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23132e",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    flex: 0.5,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#493d8a",
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.COLOR_LIGHT,
    shadowOpacity: 0.0,
  },
  buttonEnabled: {
    backgroundColor: colors.COLOR_PRIMARY,
  },
  titleDisabled: {
    color: colors.COLOR_LIGHT,
  },
  titleEnabled: {
    color: colors.COLOR_LIGHT,
    fontSize: 18,
  },
});

export default OnboardingItem;
