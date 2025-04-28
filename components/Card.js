import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Input from "./Input";

import { WeekContext } from "../store/WeekContext";

const Card = ({ day, dayData }) => {
  const { updateData } = useContext(WeekContext);
  const [amountStatus, setAmountStatus] = useState({
    earned: dayData.earned,
    expense: dayData.spent,
  });

  const handleInputChange = async (name, value) => {
    setAmountStatus((prevState) => {
      const earned = name == "earned" ? value : prevState.earned;
      const spent = name == "expense" ? value : prevState.expense;

      updateData({
        day: day.substring(0, 3),
        earned: earned == "" ? 0 : parseFloat(earned),
        spent: spent == "" ? 0 : parseFloat(spent),
        saved: earned - spent,
      });

      return {
        ...prevState,
        [name]: value ? value : 0,
      };
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{day}</Text>
      <Input
        placeholder="Earned"
        value={amountStatus.earned.toString()}
        onChangeText={(value) => handleInputChange("earned", value)}
      />
      <Input
        placeholder="Expense"
        value={amountStatus.expense.toString()}
        onChangeText={(value) => handleInputChange("expense", value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 20,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Card;
