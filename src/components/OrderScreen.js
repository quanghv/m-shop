import React from "react";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk } from "../actions";
import { Text, StyleSheet, Image, Platform, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Title,
  Left,
  Right,
  Spinner,
  Picker,
  List,
  ListItem,
  Thumbnail
} from "native-base";

import axios from "axios";

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

const Item = Picker.Item;

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: null,
      orderProducts: null,
      selected1: "0",
      statusColor: 'white',
      needToRefresh: false
    };
  }

  componentDidMount() {
    let dataUrl =
      "http://m-shop.vn/order-get-detail?order_id=" + this.props.info.id;

    //get data
    axios
      .get(dataUrl)
      .then(response => {
        this.setState({
          orderInfo: response.data.data.info,
          orderProducts: response.data.data.list,
          selected1: response.data.data.info.status
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onValueChange(value) {
    //send data to server
    var data = {
      order_id: this.props.info.id,
      status: value
    };
    axios
      .post("http://m-shop.vn/order-status-update", data)
      .then(function(response) {
        var resp = response.data;
        switch (resp.status) {
          case 1:
            Alert.alert("Thành công", resp.data.userMessage);
            break;
          default:
            Alert.alert("Lỗi", resp.data.userMessage);
            break;
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      selected1: value,
      needToRefresh: true
    });
  }

  render() {
    return (
      <Container>
        <AppHeader needToRefresh={this.state.needToRefresh} />
        <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
          {(() => {
            if (this.state.orderInfo == null) {
              return <Spinner />;
            } else {
              let orderObj = this.state.orderInfo;
              console.log(this.state, "latest state");
              return (
                <Content>
                  <Text style={styles.titleText}>
                    Thông tin khách hàng
                  </Text>

                  <Card>
                    <CardItem>
                      <Body>
                        <Text style={styles.bold}>
                          {orderObj.name}
                        </Text>
                        <Text style={styles.bold}>
                          {orderObj.phone}
                        </Text>
                        <Text>
                          {orderObj.address_full}
                        </Text>
                        <Text style={styles.note}>
                          {orderObj.note}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>

                  <Text style={styles.titleText}>
                    Tình trạng đơn hàng
                  </Text>
                  <Card style={{backgroundColor: this.state.statusColor}}>
                    <Picker
                      supportedOrientations={["portrait", "landscape"]}
                      iosHeader="Select one"
                      mode="dropdown"
                      onValueChange={this.onValueChange.bind(this)}
                      selectedValue={this.state.selected1}
                    >
                      <Item label="ĐANG GIAO HÀNG" value="0" />
                      <Item label="THÀNH CÔNG" value="1" />
                      <Item label="CHỜ XÁC NHẬN" value="-1" />
                      <Item label="ĐÃ HỦY" value="-2" />
                    </Picker>
                  </Card>

                  <Text style={styles.titleText}>
                    Thông tin đơn hàng
                  </Text>
                  <Card>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text style={[styles.textLeft, styles.bold]}>
                            Thời Gian
                          </Text>
                          <Text style={[styles.textLeft, styles.bold]}>
                            Mã
                          </Text>
                          <Text style={[styles.textLeft, styles.bold]}>
                            Thành Tiền
                          </Text>
                          <Text />
                          <Text style={styles.textLeft}>
                            Đơn giá
                          </Text>
                          <Text style={styles.textLeft}>
                            Phí vận vhuyển
                          </Text>
                          <Text style={styles.textLeft}>
                            Phí thu hộ
                          </Text>
                          <Text style={styles.textLeft}>
                            Sử dụng M-coin
                          </Text>
                          <Text />
                          <Text style={[styles.textLeft, styles.bold]}>
                            Thanh Toán
                          </Text>
                        </Body>
                      </Left>
                      <Right>
                        <Body>
                          <Text style={[styles.textRight, styles.textFocus]}>
                            {orderObj.update_time}
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
                            {(() => {
                              if (orderObj.order_type == "chuyenkhoan")
                                return "Chuyển khoản";
                              else return "Khi nhận hàng";
                            })()}
                          </Text>

                        </Body>
                      </Right>
                    </CardItem>
                  </Card>
                  <Text style={styles.titleText}>
                    Sản phẩm trong đơn hàng
                  </Text>
                  <Card>
                    <List
                      dataArray={this.state.orderProducts}
                      renderRow={item =>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail square source={{ uri: item.img }} />
                          </Left>
                          <Body>
                            <Text>{item.name}</Text>
                            <Text>Số lượng: {item.number}</Text>
                            <Text>Giá: {item.price_2}</Text>
                          </Body>
                        </ListItem>}
                    />
                  </Card>
                </Content>
              );
            }
          }).bind(this)()}
        </Content>
      </Container>
    );
  }
}

// export default OrderScreen;

function mapStateToProps(state) {
  return {
    info: state.info
  };
}
export default connect(mapStateToProps)(OrderScreen);
