import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function clickme() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Counter />
      <StatusBar style="auto" />
    </View>
  );
}

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <View>
      <Text>You clicked {count} times</Text>
      <Button onPress={() => setCount(count + 1)} title="Click me"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0593c0",
    alignItems: "center",
    justifyContent: "center",
  },
});