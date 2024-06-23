import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DetailsArray = ({ header, item, field, dotColor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{header}</Text>
      {item[field].map((value, index) => (
        <View style={styles.itemContainer} key={index}>
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
          <Text style={styles.itemText}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginVertical: 22,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 6,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  dot: {
    backgroundColor: "#000", // Default dot color
    height: 9,
    width: 9,
    borderRadius: 5,
    marginTop: 7,
  },
  itemText: {
    fontSize: 17,
    marginHorizontal: 10,
  },
});

export default DetailsArray;
