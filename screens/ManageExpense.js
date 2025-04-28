import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import Card from "../components/Card";

import { WeekContext } from "../store/WeekContext";

const ManageExpense = () => {
  const { data } = useContext(WeekContext);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <Card day="Sunday" dayData={data.find((item) => item.day === "Sun")} />
        <Card day="Monday" dayData={data.find((item) => item.day === "Mon")} />
        <Card day="Tuesday" dayData={data.find((item) => item.day === "Tue")} />
        <Card
          day="Wednesday"
          dayData={data.find((item) => item.day === "Wed")}
        />
        <Card
          day="Thursday"
          dayData={data.find((item) => item.day === "Thu")}
        />
        <Card day="Friday" dayData={data.find((item) => item.day === "Fri")} />
        <Card
          day="Saturday"
          dayData={data.find((item) => item.day === "Sat")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ManageExpense;
