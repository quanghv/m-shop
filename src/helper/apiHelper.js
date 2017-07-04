import React from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Spinner,
  Text
} from "native-base";

import NetworkError from "../layout/NetworkError";

export const hasError = () => {
  return (
    <Container>
      {/*<AppHeader isHome="true" />*/}
      <NetworkError error={this.state.data} />
    </Container>
  );
};

export const noData = () => {
  return (
    <Container>
      <View style={styles.viewMiddle}>
        <Text style={styles.textCenter}>Không có dữ liệu</Text>
      </View>
    </Container>
  );
};

const styles = {
  viewMiddle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textCenter: {
    textAlign: "center"
  }
};
