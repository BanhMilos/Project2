import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationScreen from "./.vscode/screen/AuthenticationScreen/AuthenticationScreen";
import Onboarding from "./components/Onboarding/Onboarding";
import HomeScreen from "./.vscode/screen/HomeScreen/HomeScreen";
import BottomNavigation from "./.vscode/navigation/BottomNavigation";
import { Button } from "react-native-elements";
import { View, Text } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import ImageScreen from "./.vscode/screen/ImageScreen/ImageScreen";

const Stack = createNativeStackNavigator();
//<Stack.Screen options = {{headerShown : false}}name='Authentication Screen' component={AuthenticationScreen}/>
export default function App() {
  return (
    <ImageScreen
      uri={
        "https://cdn.pixabay.com/photo/2024/04/09/15/36/after-the-rain-8686213_1280.jpg"
      }
    />
  );
}
/*
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="How to use Screen"
          component={Onboarding}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e8e8e8",
  },
});
