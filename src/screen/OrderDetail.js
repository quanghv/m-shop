import React from "react";
import { BackHandler } from "react-native";
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
  Button,
  Thumbnail,
  ActionSheet,
  Item
} from "native-base";
import Moment from "moment";

import AppHeader from "../layout/AppHeader";
import {
  getOrderDetail,
  changeOrderStatus,
  resetOrderStatus
} from "../actions";

import { consoleLog } from "../appLog";
import AppBase from "../layout/AppBase";
import constant from "../constant";

// const Item = Picker.Item;
const BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

class OrderDetail extends AppBase {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    // consoleLog(this.props.navigation.state.params);
    this.state = {
      selected1: this.props.navigation.state.params.selected,
      needToRefresh: false
    };
  }

  componentWillMount() {
    this.props.getOrderDetail(this.props.navigation.state.params.orderId);
  }

  // componentWillReceiveProps(nextProps) {
  //   consoleLog("nextProps", nextProps);
  //   if (nextProps.orderDetail !== null && !nextProps.orderStatus) {
  //     this.setState({
  //       statusColor: this.getStatusColor(nextProps.orderDetail.info.status)
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   if (this.state.needToRefresh) {
    //     prevProps.navigation.state.params.refreshFunc();
    //     prevProps.navigation.goBack();
    //   }
    // });
    // consoleLog("componentDidUpdate");

    this.props.resetOrderStatus();
  }

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
      case constant.STATUS.CONFIRM:
        return constant.COLORS.CONFIRM;
      case constant.STATUS.CONFIRM_SHIPPING:
        return constant.COLORS.CONFIRM_SHIPPING;
      case constant.STATUS.CANCEL_USER:
        return constant.COLORS.CANCEL_USER;
      case constant.STATUS.CANCEL:
        return constant.COLORS.CANCEL;
      case constant.STATUS.SHIPPING:
        return constant.COLORS.SHIPPING;
      case constant.STATUS.FINISH:
        return constant.COLORS.FINISH;
      default:
        return constant.COLORS.CANCEL;
    }
  };

  handleTime = dateTime => {
    require("moment/locale/vi");
    // const viLocale = require("moment/locale/vi");
    // Moment.lang("vi");
    // console.log(Moment.locale());
    return Moment(dateTime).format("HH:mm, DD/MM/YYYY");
    // return Moment(dateTime).calendar();
    // const time = new Date(dateTime);
    // return (
    //   `${time.getHours()}:${time.getMinutes()}` +
    //   `, ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
    // );
  };

  render() {
    // console.log("props", this.props);
    if (this.props.orderStatus !== null) {
      Alert.alert("Thông báo", this.props.orderStatus.userMessage);
    }
    // consoleLog("changeOrderStatus", this.props.orderStatus);
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
      let textNote = null;
      if (orderObj.note !== null) {
        textNote = (
          <View>
            <Text />
            <Text style={styles.note}>
              {orderObj.note}
            </Text>
          </View>
        );
      }
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
                {/*<CardItem>
                  <Button
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: BUTTONS,
                          cancelButtonIndex: CANCEL_INDEX,
                          destructiveButtonIndex: DESTRUCTIVE_INDEX,
                          title: "Options"
                        },
                        buttonIndex => {
                          this.setState({ clicked: BUTTONS[buttonIndex] });
                        }
                      )}
                  >
                    <Text>Actionsheet</Text>
                  </Button>
                </CardItem>*/}
                <Picker
                  supportedOrientations={["portrait", "landscape"]}
                  iosHeader="Select one"
                  mode="dropdown"
                  onValueChange={this.onValueChange}
                  selectedValue={this.state.selected1}
                  style={{
                    color: this.getStatusColor(this.state.selected1),
                    marginHorizontal: 10
                  }}
                >
                  <Item label="CHỜ XÁC NHẬN" value={constant.STATUS.CONFIRM} />
                  <Item
                    label="CHỜ GIAO HÀNG"
                    value={constant.STATUS.CONFIRM_SHIPPING}
                  />
                  <Item
                    label="ĐANG GIAO HÀNG"
                    value={constant.STATUS.SHIPPING}
                  />
                  <Item label="HOÀN THÀNH" value={constant.STATUS.FINISH} />
                  <Item
                    label="TRẢ HÀNG/HOÀN TIỀN"
                    value={constant.STATUS.CANCEL_USER}
                  />
                  <Item label="ĐÃ HỦY" value={constant.STATUS.CANCEL} />
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
                    {textNote}
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
