import React from "react";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";

export default createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: "Login"
  }
);
