import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "react-navigation";

import RootScreen from "./screens/RootScreen";
// Screens
import LoginScreen from "./screens/LoginScreen";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        {/* <LoginScreen /> */}
        <RootScreen />
      </View>
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
