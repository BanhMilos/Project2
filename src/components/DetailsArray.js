import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DetailsArray = ({ header, item, field, dotColor }) => {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginVertical: 22,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}>
        {header}
      </Text>
      {item[field].map((value, index) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginVertical: 4,
            }}
            key={index}
          >
            <View
              style={{
                backgroundColor: dotColor,
                height: 9,
                width: 9,
                borderRadius: 5,
                marginTop: 7,
              }}
            />
            <Text style={{ fontSize: 17, marginHorizontal: 10 }}>{value}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default DetailsArray;

const styles = StyleSheet.create({});
