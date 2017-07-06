import React from "react";
import { Actions } from "react-native-router-flux";
import { Image, Platform } from "react-native";
import { Header, Body, Left, Button, Icon } from "native-base";

export default class AppHeader extends React.Component {
  render() {
    console.log(this.props, "test app");
    if (this.props.isHome == "true") {
      return (
        <Header>
          {(() => {
            if (Platform.OS == "android") {
              return <Left />;
            }
          })()}
          <Body>
            <Image source={require("../assets/logo.png")} />
          </Body>
        </Header>
      );
    } else {
      return (
        <Header>
          {(() => {
            if (Platform.OS === "android") {
              return (
                <Left>
                  <Button
                    transparent
                    onPress={() => {
                      if (this.props.needToRefresh) {
                        this.props.nav.state.params.refreshFunc();
                        this.props.nav.goBack();
                      }
                    }}
                  >
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
              );
            } else {
              return (
                <Button
                  transparent
                  onPress={() =>
                    Actions.pop({
                      refresh: { value: this.props.needToRefresh }
                    })}
                >
                  <Icon name="arrow-back" />
                </Button>
              );
            }
          })()}
          <Body>
            <Image source={require("../assets/logo.png")} />
          </Body>
        </Header>
      );
    }
  }
}
