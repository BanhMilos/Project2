import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import SignInScreen from './.vscode/screen/SignInScreen/SignInScreen';
import SignUpScreen from './.vscode/screen/SignUpScreen/SignUpScreen';
import ResetPasswordScreen from './.vscode/screen/ResetPasswordScreen/ResetPasswordScreen';
import EmailConFirmScreen from './.vscode/screen/EmailConfirmScreen/EmailConFirmScreen';


export default function App() {
  return (
    //<BackgroundScreen/>
    <View style={styles.container}>
      <SignUpScreen/>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      backgroundColor : "#e8e8e8",
    }
});
