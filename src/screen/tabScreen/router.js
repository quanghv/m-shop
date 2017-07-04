import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Footer, FooterTab, Icon, Button, Text } from "native-base";

import TabConfirm from "./TabConfirm";
import TabShipping from "./TabShipping";
import TabFinish from "./TabFinish";
import TabCancel from "./TabCancel";

export const TabScreen = TabNavigator(
  {
    TabConfirm: { screen: TabConfirm },
    TabShipping: { screen: TabShipping },
    TabFinish: { screen: TabFinish },
    TabCancel: { screen: TabCancel }
  },
  {
    // lazy: true,
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("TabConfirm")}
            >
              <Icon name="notifications" />
              <Text>Xác nhận</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("TabShipping")}
            >
              <Icon name="bicycle" />
              <Text>Giao hàng</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("TabFinish")}
            >
              <Icon name="podium" />
              <Text>xong</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("TabCancel")}
            >
              <Icon name="notifications-off" />
              <Text>Đã hủy</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export const MainStack = StackNavigator(
  {
    TabScreen: { screen: TabScreen }
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);
