import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../styles/colors";
import headers from "../styles/headers";
import Login from "../components/Login";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ACTIVITEAM</Text>
        </View>
        <View style={styles.loginContainer}>
          <Login />
        </View>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyDark,
    justifyContent: "space-around"
  },
  titleContainer: {
    flex: 2,
    alignSelf: "center",
    justifyContent: "center"
  },
  title: {
    ...headers.one,
    color: colors.white,
    letterSpacing: 8,
    fontWeight: "600"
  },
  loginContainer: {
    flex: 3
  }
});
