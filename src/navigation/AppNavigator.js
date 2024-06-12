import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import Onboarding from "../components/Onboarding/Onboarding";
import ImageScreen from "../screens/ImageScreen";
import IngredientDetailsScreen from "../screens/IngredientDetailsScreen";
import IngredientsListScreen from "../screens/IngredientListScreen";
import TestingScreen from "../screens/TestingScreen";
import FavScreen from "../screens/FavScreen";

const Stack = createNativeStackNavigator();
/*
<Stack.Screen name="Test" component={TestingScreen} />
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        <Stack.Screen name="RecipeList" component={RecipeListScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
        <Stack.Screen
          name="IngredientDetails"
          component={IngredientDetailsScreen}
        />
        <Stack.Screen name="FavList" component={FavScreen} />
        <Stack.Screen name="IngredientList" component={IngredientsListScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
