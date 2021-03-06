/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry } from "react-native";
import SplashScreen from "react-native-smart-splash-screen";
import App from "./src/AppNavigation";

export default class truyen extends Component {
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 1000,
      delay: 500
    });
  }

  render() {
    return <App />;
  }
}

AppRegistry.registerComponent("truyen", () => truyen);
