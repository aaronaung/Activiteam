import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { StyleSheet, View } from "react-native";

// Screens
import LoginScreen from "./screens/LoginScreen";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <LoginScreen />
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
