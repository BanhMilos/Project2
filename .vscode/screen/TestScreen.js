import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import { useState } from 'react'
import { auth } from '../../../firebase';

function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [SignInVisible, setSignInVisible] = useState('none');
    const [SignUpVisible, setSignUpVisible] = useState('flex');
    const onSignUpPressed = () => {
        console.log("sign up")
    }
    const onSignInSecondary = () => {
        console.log("sign in secondary")
        setSignInVisible("flex")
        setSignUpVisible("none")
    }
    const onSignInPressed = () => {
        
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
    const onSignUpSecondary = () => {
        console.log("sign up secondary")
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
  return (
    <ImageBackground 
        source={require("C:/Users/44886/OneDrive/Desktop/React Native/Project2/assets/welcome-image.png")} 
        style={styles.background}>
        <Image
            style = {styles.logo}
            source={require("C:/Users/44886/OneDrive/Desktop/React Native/Project2/assets/logo.png")}
        />
        <View 
            style={[styles.container, {display : SignUpVisible}]}>
            <CustomInput placeholder = "Username" value={username} setValue={text => setUsername(text)}/>
            <CustomInput placeholder={"Email"} value={email} setValue={text => setEmail(text)}/>
            <CustomInput placeholder = "Password" value={password} setValue={text => setPassword(text)} secureTextEntry={true}/>
            <CustomInput placeholder = "Confirm password" value={confirmPassword} setValue={text => setConfirmPassword(text)} secureTextEntry={true}/>  
            <CustomButton text= "Sign up" onPress={handleSignUp}/>
            <View style = {{flex : 1, justifyContent : 'flex-end', marginBottom : 10}}>
            <Text style={{marginVertical : 10}}> Already have an account?  
                <Text style={{
                    color : '#5A57E1', fontWeight : 'bold'}} 
                    onPress={onSignInSecondary}> Sign in</Text>
            </Text>
            </View>
        </View>
        <View 
            style={[styles.container, {display : SignInVisible}]}>
            <CustomInput placeholder = "Username" value={username} setValue={setUsername}/>
            <CustomInput placeholder = "Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomButton text= "Sign in" onPress={onSignInPressed}/>
            <Pressable onPress={onForgotPressed}>
                <Text style={{marginBottom : 10, color : "#5A57E1", left : -90, fontWeight : 'bold'}}> Forgot password </Text>
            </Pressable>
            <CustomButton text= "Sign in with Facebook" bgColor= "#e7eaf4" fgColor="#4765a9" onPress={onSignInFacebook}/>
            <CustomButton text= "Sign in with Google" bgColor= "#fae9ea" fgColor="#dd4d44" onPress={onSignInGoogle}/>
            <View style={{flex : 1, justifyContent : 'flex-end', marginBottom : 10}}>
            <Text style={{marginVertical : 10}}> Dont have an account? 
              <Text style={{color : '#5A57E1', fontWeight : 'bold'}} onPress={onSignUpSecondary}> Sign up</Text>
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
        //position : 'absolute',
        //top : 100,
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
  

export default SignUpScreen