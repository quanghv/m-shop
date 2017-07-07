import React from "react";
import { Image } from "react-native";
import { Container, Content, StyleProvider } from "native-base";

import getThem from "./theme/components";
import mshop from "./theme/variables/mshop";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Scene, Actions } from "react-native-router-flux";

import allReducers from "./reducers/index";
import thunk from "redux-thunk";

import HomeScreen from "./components/HomeScreen";
import OrderScreen from "./components/OrderScreen";

//push notification onesignal
import OneSignal from "react-native-onesignal";

const store = createStore(allReducers, applyMiddleware(thunk));

export default class App extends React.Component {
  componentDidMount() {
    OneSignal.configure({});
    OneSignal.addEventListener("opened", this.onOpened);
  }
  onOpened(openResult) {
    // consoleLog(openResult);
    const data = openResult.notification.payload.additionalData;
    if (data !== undefined) {
      Actions.orderInfo({ order_id: data.order_id });
    }
  }
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getThem(mshop)}>

          <Router hideNavBar="true">
            <Scene key="root">
              <Scene key="home" component={HomeScreen} initial="true"/>
              <Scene key="orderInfo" component={OrderScreen}  />
            </Scene>
          </Router>

        </StyleProvider>
      </Provider>
    );
  }
}
