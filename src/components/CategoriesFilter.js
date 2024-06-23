import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { categories, colors } from "../Constant";

const CategoriesFilter = ({ onCategoryChange }) => {
  const [focusIndex, setFocusIndex] = useState(-1); // Adjusted initial state for consistency
  const [selectedCategory, setSelectedCategory] = useState("all");

  const onCategoryPress = (index, categoryTitle) => {
    if (index === focusIndex) {
      setFocusIndex(-1);
      setSelectedCategory("all");
      onCategoryChange("all");
    } else {
      setFocusIndex(index);
      setSelectedCategory(categoryTitle);
      onCategoryChange(categoryTitle);
    }
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onCategoryPress(index, category.title)}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  index === focusIndex
                    ? colors.COLOR_PRIMARY
                    : colors.COLOR_LIGHT,
              },
            ]}
          >
            <Text
              style={{
                color:
                  index === focusIndex
                    ? colors.COLOR_LIGHT
                    : colors.COLOR_DARK_ALT,
                fontSize: 18,
              }}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    marginRight: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
  },
});

export default CategoriesFilter;
