import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Alert, Text } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Picker,
  List,
  ListItem,
  Thumbnail
} from "native-base";

import AppHeader from "../layout/AppHeader";
import {
  getOrderDetail,
  changeOrderStatus,
  resetOrderStatus
} from "../actions";

import { consoleLog } from "../appLog";
import AppBase from "../layout/AppBase";

const Item = Picker.Item;

class OrderDetail extends AppBase {
  constructor(props) {
    super(props);
    this.state = {
      selected1: this.props.navigation.state.params.selected,
      statusColor: "gray",
      needToRefresh: false
    };
  }

  componentWillMount() {
    this.props.getOrderDetail(this.props.navigation.state.params.orderId);
  }

  componentDidUpdate(prevProps, prevState) {
    consoleLog("componentDidUpdate");
    this.props.resetOrderStatus();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.orderStatus !== null) {
  //     this.setState({
  //       needToRefresh: true
  //     });
  //   }
  // }

  onValueChange = value => {
    //send data to server
    this.props.changeOrderStatus(
      this.props.navigation.state.params.orderId,
      value
    );
    this.setState({
      selected1: value,
      needToRefresh: true
    });
  };

  getStatusColor = status => {
    switch (status) {
      case "-1":
        return "#FF5722";
      case "-11":
        return "#FF5722";
      case "-12":
        return "#B0BEC5";
      case "-2":
        return "#7f8c8d";
      case "0":
        return "#1976D2";
      case "1":
        return "#2E7D32";
      default:
        return "#2E7D32";
    }
  };

  handleTime = dateTime => {
    const time = new Date(dateTime);
    return `${time.getHours()}:${time.getMinutes()}, ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
  };

  render() {
    if (this.props.orderStatus !== null) {
      Alert.alert("Thông báo", this.props.orderStatus.userMessage);
    }
    consoleLog("changeOrderStatus", this.props.orderStatus);
    let view = null;
    if (this.props.getError) {
      view = this.renderLoading(
        <AppHeader needToRefresh={this.state.needToRefresh} />
      );
    } else if (this.props.isLoading) {
      view = this.renderLoading(
        <AppHeader needToRefresh={this.state.needToRefresh} />
      );
    } else if (this.props.orderDetail !== null) {
      const orderObj = this.props.orderDetail.info;
      view = (
        <Container>
          <AppHeader
            needToRefresh={this.state.needToRefresh}
            nav={this.props.navigation}
          />
          <Content>
            <View
              style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}
            >
              <Card>
                <CardItem header>
                  <Text>Tình trạng đơn hàng</Text>
                </CardItem>
                <Picker
                  supportedOrientations={["portrait", "landscape"]}
                  iosHeader="Select one"
                  mode="dropdown"
                  onValueChange={this.onValueChange}
                  selectedValue={this.state.selected1}
                  style={{
                    color: this.state.statusColor,
                    marginHorizontal: 10
                  }}
                >
                  <Item label="CHỜ XÁC NHẬN" value="-1" />
                  <Item label="CHỜ GIAO HÀNG" value="-11" />
                  <Item label="ĐANG GIAO HÀNG" value="0" />
                  <Item label="HOÀN THÀNH" value="1" />
                  <Item label="TRẢ HÀNG/HOÀN TIỀN" value="-12" />
                  <Item label="ĐÃ HỦY" value="-2" />
                </Picker>
              </Card>
              <Card>
                <CardItem header>
                  <Text>Thông tin khách hàng</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text bold>
                      {orderObj.name}
                    </Text>
                    <Text>
                      {orderObj.phone}
                    </Text>
                    <Text>
                      {orderObj.address_full}
                    </Text>
                    {() => {
                      if (orderObj.note !== null) {
                        return (
                          <View>
                            <Text /> <Text note>{orderObj.note}</Text>
                          </View>
                        );
                      }
                    }}
                  </Body>
                </CardItem>
              </Card>

              <Card>
                <CardItem header>
                  <Text>Thông tin đơn hàng</Text>
                </CardItem>
                <CardItem>
                  <Left style={{ left: -10 }}>
                    <Body>
                      <Text style={[styles.textLeft, styles.bold]}>
                        Thời Gian
                      </Text>
                      <Text style={[styles.textLeft, styles.bold]}>Mã</Text>
                      <Text style={[styles.textLeft, styles.bold]}>
                        Thành Tiền
                      </Text>
                      <Text />
                      <Text style={styles.textLeft}>Đơn giá</Text>
                      <Text style={styles.textLeft}>Phí vận chuyển</Text>
                      <Text style={styles.textLeft}>Phí thu hộ</Text>
                      <Text style={styles.textLeft}>Sử dụng M-coin</Text>
                      <Text />
                      <Text style={[styles.textLeft, styles.bold]}>
                        Thanh Toán
                      </Text>
                    </Body>
                  </Left>
                  <Right style={{ right: -10 }}>
                    <Body>
                      <Text
                        numberOfLines={1}
                        style={[styles.textRight, styles.textFocus]}
                      >
                        {this.handleTime(orderObj.update_time)}
                      </Text>
                      <Text style={[styles.textRight, styles.textFocus]}>
                        {orderObj.code}
                      </Text>
                      <Text style={[styles.textRight, styles.textFocus]}>
                        {orderObj.total_price}
                      </Text>
                      <Text />
                      <Text style={styles.textRight}>
                        {orderObj.order_price}
                      </Text>
                      <Text style={styles.textRight}>
                        {orderObj.pvc_price}
                      </Text>
                      <Text style={styles.textRight}>
                        {orderObj.cod_price}
                      </Text>
                      <Text style={styles.textRight}>
                        {orderObj.account_point_use}
                      </Text>
                      <Text />
                      <Text style={[styles.textRight, styles.textFocus]}>
                        {orderObj.order_type === "chuyenkhoan"
                          ? "Chuyển khoản"
                          : "Khi nhận hàng"}
                      </Text>
                    </Body>
                  </Right>
                </CardItem>
              </Card>

              <Card>
                <CardItem header>
                  <Text>Sản phẩm trong đơn hàng</Text>
                </CardItem>
                <List
                  dataArray={this.props.orderDetail.list}
                  renderRow={item =>
                    <ListItem avatar>
                      <Left>
                        <Thumbnail square source={{ uri: item.img }} />
                      </Left>
                      <Body>
                        <Text>
                          {item.name}
                        </Text>
                        <Text>
                          Số lượng: {item.number}
                        </Text>
                        <Text>
                          Giá: {item.price_2}
                        </Text>
                      </Body>
                    </ListItem>}
                  keyExtractor={item => item.id}
                />
              </Card>
            </View>
          </Content>
        </Container>
      );
    } else {
      view = this.renderNoData();
    }
    return view;
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "400",
    marginTop: 10,
    fontSize: 18
  },
  bold: {
    fontWeight: "bold"
  },
  note: {
    fontStyle: "italic",
    color: "brown"
  },
  textRight: {
    textAlign: "right",
    alignSelf: "stretch"
  },
  textLeft: {
    textAlign: "left",
    alignSelf: "stretch"
  },
  textFocus: {
    color: "#59348a",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  orderDetail: state.orderDetail,
  orderStatus: state.orderStatus,
  getError: state.getError,
  isLoading: state.isLoading
});

export default connect(mapStateToProps, {
  getOrderDetail,
  changeOrderStatus,
  resetOrderStatus
})(OrderDetail);
