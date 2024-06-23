import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DetailsArray from "../components/DetailsArray";

const IngredientDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={[styles.background, { backgroundColor: item.color }]} />

      {/* SafeAreaView for Header */}
      <SafeAreaView style={styles.safeArea}>
        <Pressable style={styles.backButton} onPress={goBack}>
          <FontAwesome name="arrow-circle-left" size={28} color="white" />
        </Pressable>
      </SafeAreaView>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Circular Image */}
        <View style={styles.imageContainer}>
          <Image
            defaultSource={require("../../assets/loading.png")}
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>

        {/* Ingredient Name */}
        <Text style={styles.name}>{item.name}</Text>

        {/* ScrollView for Details */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Overview */}
          <Text style={styles.overview}>{item.overview}</Text>

          {/* Details Arrays */}
          <DetailsArray
            header="Nutrition:"
            item={item}
            field="nutritionalValue"
            dotColor="green"
          />
          <DetailsArray
            header="Benefits:"
            item={item}
            field="healthBenefits"
            dotColor="pink"
          />
          <DetailsArray
            header="Uses:"
            item={item}
            field="culinaryUses"
            dotColor="purple"
          />
          <DetailsArray
            header="Cooking:"
            item={item}
            field="cookingTips"
            dotColor="orange"
          />
          <DetailsArray
            header="Storage:"
            item={item}
            field="storageTips"
            dotColor="blue"
          />

          {/* Fun Facts */}
          <View style={styles.factsContainer}>
            <Text style={styles.factsHeader}>Facts:</Text>
            {item.funFacts.map((fact, index) => (
              <Text key={index} style={styles.fact}>{`${
                index + 1
              }) ${fact}`}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  backButton: {
    flex: 1,
    marginTop: 10,
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    marginTop: 140,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    borderRadius: 140,
    borderWidth: 3,
    borderColor: "gray",
  },
  name: {
    marginTop: 150,
    fontSize: 28,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    alignSelf: "stretch",
  },
  overview: {
    fontSize: 20,
    marginVertical: 16,
  },
  factsContainer: {
    alignSelf: "flex-start",
    marginVertical: 22,
  },
  factsHeader: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 6,
  },
  fact: {
    fontSize: 17,
    marginLeft: 6,
    marginVertical: 6,
  },
});

export default IngredientDetailsScreen;
