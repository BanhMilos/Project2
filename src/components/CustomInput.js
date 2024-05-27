import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput 
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry = {secureTextEntry}
      /> 
  </View>
  )
}

const styles = StyleSheet.create({
    container : {
        //top : 80,
        backgroundColor : "white",
        width : "100%",
        borderColor : "gray",
        borderWidth : 0.4,
        borderRadius : 10,
        paddingHorizontal : 15,
        marginVertical: 3,
        height : 50,
        justifyContent : 'center'
    },
    input : {
        fontSize : 16
    }
})

export default CustomInput