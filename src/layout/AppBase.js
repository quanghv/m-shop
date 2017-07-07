import React, { Component } from "react";
import { View } from "react-native";
import { Container, Text, Button, Body, Icon, Spinner } from "native-base";
import { Grid, Row } from "react-native-easy-grid";

export default class AppBase extends Component {
  renderLoading = header =>
    <Container>
      {header}
      <View style={styles.viewMiddle}>
        <Grid style={{ alignItems: "center" }}>
          <Row />
          <Row>
            <View>
              <Body>
                <Spinner />
                <Text />
                <Text>Đang tải dữ liệu...</Text>
              </Body>
            </View>
          </Row>
          <Row />
        </Grid>
      </View>
    </Container>;

  renderNoData = header => {
    console.log("noDATA", this);
    return (
      <Container>
        {header}
        <View style={styles.viewMiddle}>
          <Grid style={{ alignItems: "center" }}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Icon primary name="cart" />
                  <Text />
                  <Text>Chưa có đơn hàng</Text>
                  <Text />
                  <Button
                    small
                    transparent
                    onPress={() => this.handleRefresh()}
                  >
                    {/*<Icon name="refresh" style={styles.tryAgain} />*/}
                    <Text style={styles.tryAgain}>Nhấn để thử lại</Text>
                  </Button>
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };

  renderNetworkError = header => {
    console.log("network error");
    return (
      <Container>
        {header}
        <View style={styles.viewMiddle}>
          <Grid style={{ alignItems: "center" }}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Icon primary name="sad" />
                  <Text />
                  <Text>Lỗi khi tải dữ liệu</Text>
                  <Button transparent onPress={() => this.handleRefresh()}>
                    <Icon name="refresh" style={{ fontSize: 12 }} />
                    <Text primary style={{ fontStyle: "italic", fontSize: 12 }}>
                      Nhấn để thử lại
                    </Text>
                  </Button>
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };
}

const styles = {
  viewMiddle: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  tryAgain: {
    fontSize: 13
  }
};
