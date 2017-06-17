import React from "react";
import { Actions } from "react-native-router-flux";
import { Image } from "react-native";
import { Header, Body, Left, Right, Button, Icon } from "native-base";

export default class AppHeader extends React.Component {
  render() {
    if (this.props.isHome == "true") {
      return (
        <Header>
          <Left />
          <Body>
            <Image source={require("../assets/logo.png")} />
          </Body>
        </Header>
      );
    } else {
      return (
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Image source={require("../assets/logo.png")} />
          </Body>
        </Header>
      );
    }
  }
}
