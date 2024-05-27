import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { categories, colors } from "../Constant";

const CategoriesFilter = ({ onCategoryChange }) => {
  const [focusIndex, setFocusIndex] = useState(-10);
  const [category, setCategory] = useState("all");
  const onCategoryPress = ({ index, category }) => {
    if (index == focusIndex) {
      setFocusIndex(-10);
      setCategory("all");
      onCategoryChange("all");
    } else {
      setFocusIndex(index);
      setCategory(category.title);
      onCategoryChange(category.title);
    }
  };
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onCategoryPress({ index, category })}
              style={{
                backgroundColor:
                  index == focusIndex
                    ? colors.COLOR_PRIMARY
                    : colors.COLOR_LIGHT,
                marginRight: 10,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
                marginVertical: 16,
              }}
            >
              <Text
                style={{
                  color:
                    index == focusIndex
                      ? colors.COLOR_LIGHT
                      : colors.COLOR_DARK_ALT,
                  fontSize: 18,
                }}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesFilter;

const styles = StyleSheet.create({});
