
import {StyleSheet, Text, View} from 'react-native';
import SignInScreen from './.vscode/screen/SignInScreen/SignInScreen';
import SignUpScreen from './.vscode/screen/SignUpScreen/SignUpScreen';
import ResetPasswordScreen from './.vscode/screen/ResetPasswordScreen/ResetPasswordScreen';
import EmailConFirmScreen from './.vscode/screen/EmailConfirmScreen/EmailConFirmScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticationScreen from './.vscode/screen/AuthenticationScreen/AuthenticationScreen';
import Onboarding from './components/Onboarding/Onboarding';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options = {{headerShown : false}}name='Authentication Screen' component={AuthenticationScreen}/>
          <Stack.Screen options = {{headerShown : false}}name='How to use Screen' component={Onboarding}/>
        </Stack.Navigator>
      </NavigationContainer>

  )
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center',
      backgroundColor : "#e8e8e8",
    }
});
