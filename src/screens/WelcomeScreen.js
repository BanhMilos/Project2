import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/images/welcome.png")}
        style={{ marginTop: 30 }}
      />
      <Text style={{ color: "#f96163", fontSize: 50, fontWeight: "bold" }}>
        Only Pan
      </Text>
      <Text
        style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "#3c444c",
          marginTop: 44,
          marginBottom: 40,
        }}
      >
        Let you cook
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeList")}
        style={{
          backgroundColor: "#f96163",
          borderRadius: 18,
          paddingVertical: 18,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
          Let's Go
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
