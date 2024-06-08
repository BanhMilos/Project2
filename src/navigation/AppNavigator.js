import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import Onboarding from "../components/Onboarding/Onboarding";
import ImageScreen from "../screens/ImageScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  //<Stack.Screen name="Authentication" component={AuthenticationScreen} />
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipeList" component={RecipeListScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
