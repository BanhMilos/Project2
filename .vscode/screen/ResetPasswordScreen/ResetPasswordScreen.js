import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useState } from 'react'

const ResetPasswordScreen = () => {
  return (
    <ImageBackground 
        source={require("C:/Users/44886/OneDrive/Desktop/React Native/Project2/assets/welcome-image.png")} 
        style={styles.background}>
        <Image
            style = {styles.logo}
            source={require("C:/Users/44886/OneDrive/Desktop/React Native/Project2/assets/logo.png")}
        />  
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    background : {
        flex : 1,
        alignItems : 'center',
        alignContent : 'center',
        padding : 30
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
        //alignContent : 'center',
        width : "100%",
        height : 400,
        paddingHorizontal : 30,
        paddingTop : 30,
        borderWidth : 0.5,
        borderRadius : 10,
    },
  });

export default ResetPasswordScreen