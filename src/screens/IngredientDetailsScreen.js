import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import DetailsArray from "../components/DetailsArray";

const IngredientDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View style={{ backgroundColor: item.color, flex: 1 }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
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
            height: 290,
            width: 290,
            position: "absolute",
            top: -150,
            // marginBottom: 130,
          }}
        />
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
        {/* Ingredient Name */}
        <Text style={{ marginTop: 150, fontSize: 28, fontWeight: "bold" }}>
          {item.name}
        </Text>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Overview */}
            <Text style={{ fontSize: 20, marginVertical: 16 }}>
              {item.overview}
            </Text>
            {/* Nutrition */}
            <DetailsArray
              header={"Nutrition:"}
              item={item}
              field={"nutritionalValue"}
              dotColor={"green"}
            />

            {/* Health Benefits */}
            <DetailsArray
              header={"Benefits:"}
              item={item}
              field={"healthBenefits"}
              dotColor={"pink"}
            />

            {/* Culinary Uses */}
            <DetailsArray
              header={"Uses:"}
              item={item}
              field={"culinaryUses"}
              dotColor={"purple"}
            />

            {/* Cooking Tips */}
            <DetailsArray
              header={"Cooking:"}
              item={item}
              field={"cookingTips"}
              dotColor={"orange"}
            />

            {/* Storage Tips */}
            <DetailsArray
              header={"Storage:"}
              item={item}
              field={"storageTips"}
              dotColor={"blue"}
            />

            {/* Facts */}
            <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
              <Text
                style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}
              >
                Facts:
              </Text>

              {item.funFacts.map((fact, index) => {
                return (
                  <Text
                    key={index}
                    style={{ fontSize: 17, marginLeft: 6, marginVertical: 6 }}
                  >{`${index + 1} ) ${fact}`}</Text>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default IngredientDetailsScreen;

const styles = StyleSheet.create({});
