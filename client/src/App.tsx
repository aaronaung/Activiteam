import React from "react";
import { StyleSheet, View } from "react-native";

import LoginScreen from "./screens/LoginScreen";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
