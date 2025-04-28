import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { WeekContext } from "../store/WeekContext";

const Home = () => {
  const { data } = useContext(WeekContext);

  const summary = data.reduce(
    (acc, expense) => ({
      saved: acc.saved + expense.saved,
      earned: acc.earned + expense.earned,
      spent: acc.spent + expense.spent,
    }),
    { saved: 0, earned: 0, spent: 0 }
  );

  return (
    <View style={styles.screen}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Weekly Expenses Summary</Text>
        <View style={styles.summaryAmountsContainer}>
          <View style={styles.summaryAmountText}>
            <Text style={styles.summaryAmountTextTitle}>Saved: </Text>
            <Text>${summary.saved}</Text>
          </View>
          <View style={styles.summaryAmountText}>
            <Text style={styles.summaryAmountTextTitle}>Earned: </Text>
            <Text>${summary.earned}</Text>
          </View>
          <View style={styles.summaryAmountText}>
            <Text style={styles.summaryAmountTextTitle}>Spent: </Text>
            <Text>${summary.spent}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dailyExpensesContainer}>
        <Text style={styles.dailyExpensesTitle}>Daily Expenses</Text>
        <View style={styles.dailyExpenseContainer}>
          {data.map((expense) => (
            <View key={expense.day} style={styles.dailySummaryContainer}>
              <View style={styles.namContainer}>
                <Text>{expense.day}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text>${expense.earned}</Text>
                <Text>${expense.spent}</Text>
                <Text>${expense.saved}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  summaryContainer: {
    padding: 16,
    margin: 16,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  summaryAmountsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryAmountText: {
    flexDirection: "row",
  },
  summaryAmountTextTitle: {
    fontWeight: "bold",
  },
  dailyExpensesContainer: {
    padding: 16,
    margin: 16,
  },
  dailyExpensesTitle: {
    fontSize: 22,
    marginVertical: 16,
  },
  dailySummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  namContainer: {
    flex: 2,
  },
  amountContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
