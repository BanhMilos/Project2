import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Icon } from 'react-native-elements'


export default function HomeScreen() {
  return (
    <View>
        <Text>wtf</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        color : "white"
    },  
    stsBar : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    bar : {
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius : 10,
        borderColor : 'gray'
    }

})