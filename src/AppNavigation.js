import React from "react";
import getThem from "./theme/components";
import mshop from "./theme/variables/mshop";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/index";
import thunk from "redux-thunk";
import { StyleProvider } from "native-base";

import { MainStack } from "./tabScreen/router";
// import OrderScreen from "./components/OrderScreen";

//push notification onesignal
import OneSignal from "react-native-onesignal";

const store = createStore(allReducers, applyMiddleware(thunk));

export default class App extends React.Component {
  componentDidMount() {
    OneSignal.configure({});
    OneSignal.addEventListener("opened", this.onOpened);
  }
  onOpened(openResult) {
    // console.log(openResult);
    // let data = openResult.notification.payload.additionalData;
    // if (data != undefined) {
    //   Actions.orderInfo({ order_id: data.order_id });
    // } else {
    // }
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
