import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const RadioButton = ({ selected, onPress }) => (
  <Pressable onPress={onPress} style={styles.radioButton}>
    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
      {selected && <View style={styles.innerCircle} />}
    </View>
  </Pressable>
);

const RadioGroup = ({ options, selectedValues, onValueChange }) => (
  <View style={styles.container}>
    {options.map((option) => (
      <Pressable
        key={option.value}
        onPress={() => onValueChange(option.value)}
        style={styles.option}
      >
        <RadioButton
          selected={selectedValues.includes(option.value)}
          onPress={() => onValueChange(option.value)}
        />
        <Text style={styles.optionText}>{option.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 45,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedOuterCircle: {
    borderColor: "#462E84",
  },
  innerCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#462E84",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  optionText: {
    fontSize: 14,
  },
});

export default RadioGroup;
