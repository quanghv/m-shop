import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StyleProvider } from "native-base";
import OneSignal from "react-native-onesignal";

import allReducers from "./reducers/index";
import getThem from "./theme/components";
import mshop from "./theme/variables/mshop";
import { MainStack } from "./screen/router";

//push notification onesignal

const store = createStore(allReducers, applyMiddleware(thunk));

export default class App extends React.Component {
  componentDidMount() {
    OneSignal.configure({});
    OneSignal.addEventListener("opened", this.onOpened);
  }
  onOpened(openResult) {
    console.log(openResult);
    const data = openResult.notification.payload.additionalData;
    if (data !== undefined) {
      this.props.navigation.navigate("OrderDetail", {
        orderId: data.order_id,
        selected: -1,
        refreshFunc: () => {}
      });
    } else {
    }
  }
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getThem(mshop)}>
          <MainStack />
        </StyleProvider>
      </Provider>
    );
  }
}
