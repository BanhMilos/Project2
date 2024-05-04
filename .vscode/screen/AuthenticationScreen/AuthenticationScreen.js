import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import { useState } from 'react'
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

function AuthenticationScreen() {

    const navigation = useNavigation()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [SignInVisible, setSignInVisible] = useState('none');
    const [SignUpVisible, setSignUpVisible] = useState('flex');
    const handleSignIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email + " signed in");
        })
        .catch(error => alert(error.message))
    }
    const onForgotPressed = () => {
        console.log("forgot")
    }
    const onSignInFacebook = () => {
        console.log("sign in facebook")
    }
    const onSignInGoogle = () => {
        console.log("sign in google")
    }
    const onSignUpSwitch = () => {
        console.log("sign up switched")
        setSignInVisible("none")
        setSignUpVisible("flex")
    }
    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }
    const onSignInSwitch = () => {
        console.log("sign in switched")
        setSignInVisible("flex")
        setSignUpVisible("none")
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("How to use Screen")
            }
        })
        return unsubscribe
    })
  return (

    <ImageBackground 
        source={require("../../../assets/welcome-image.png")} 
        style={styles.background}>
        <Image
            style = {styles.logo}
            //source={require("C:/Users/44886/OneDrive/Desktop/React Native/Project2/assets/logo.png")}
            source={require("../../../assets/logo.png")}
        />

        <View
            id='Sign up box' 
            style={[styles.container, {display : SignUpVisible}]}>
            <CustomInput placeholder={"Email"} value={email} setValue={text => setEmail(text)}/>
            <CustomInput placeholder = "Password" value={password} setValue={text => setPassword(text)} secureTextEntry={true}/>
            <CustomInput placeholder = "Confirm password" value={confirmPassword} setValue={text => setConfirmPassword(text)} secureTextEntry={true}/>  
            <CustomInput placeholder = "Username" value={username} setValue={text => setUsername(text)}/>
            <CustomButton text= "Sign up" onPress={handleSignUp}/>
            <View style = {{flex : 1, justifyContent : 'flex-end', marginBottom : 10}}>
            <Text style={{marginVertical : 10}}> Already have an account?  
                <Text style={{
                    color : '#5A57E1', fontWeight : 'bold'}} 
                    onPress={onSignInSwitch}> Sign in</Text>
            </Text>
            </View>
        </View>
        <View
            id='Sign in box' 
            style={[styles.container, {display : SignInVisible}]}>
            <CustomInput placeholder = "Email" value={email} setValue={setEmail}/>
            <CustomInput placeholder = "Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomButton text= "Sign in" onPress={handleSignIn}/>
            <Pressable onPress={onForgotPressed}>
                <Text style={{marginBottom : 10, color : "#5A57E1", left : -90, fontWeight : 'bold'}}> Forgot password </Text>
            </Pressable>
            <CustomButton text= "Sign in with Facebook" bgColor= "#e7eaf4" fgColor="#4765a9" onPress={onSignInFacebook}/>
            <CustomButton text= "Sign in with Google" bgColor= "#fae9ea" fgColor="#dd4d44" onPress={onSignInGoogle}/>
            <View style={{flex : 1, justifyContent : 'flex-end', marginBottom : 10}}>
            <Text style={{marginVertical : 10}}> Dont have an account? 
              <Text style={{color : '#5A57E1', fontWeight : 'bold'}} onPress={onSignUpSwitch}> Sign up</Text>
            </Text>
            </View>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    background : {
        flex : 1,
        alignItems : 'center',
        alignContent : 'center',
        padding : 30,
    },
    logo : {
        height : 260,
        width : 260,
        resizeMode : 'contain'
    },
    container : {
        backgroundColor : "#F4F4F3",
        alignItems : 'center',
        width : "100%",
        height : 400,
        paddingHorizontal : 30,
        paddingTop : 30,
        borderWidth : 0.5,
        borderRadius : 10,
    },
  });
  

export default AuthenticationScreen