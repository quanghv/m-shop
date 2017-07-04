import React from "react";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk } from "../actions";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  Alert
} from "react-native";
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

const Item = Picker.Item;

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: null,
      orderProducts: null,
      selected1: "0",
      statusColor: "gray",
      needToRefresh: false
    };
  }

  componentDidMount() {
    // console.log(this.state, "sate");
    // console.log(this.props, "props");
    // let order_id = this.props.info != null
    //   ? this.props.info.id
    //   : this.props.order_id;
    let dataUrl =
      "http://m-shop.vn/order-get-detail?order_id=" + this.props.order_id;

    //get data
    axios
      .get(dataUrl)
      .then(response => {
        this.setState({
          orderInfo: response.data.data.info,
          orderProducts: response.data.data.list,
          selected1: response.data.data.info.status,
          statusColor: this.getStatusColor(response.data.data.info.status)
        });
      })
      .catch(error => {
        Alert.alert(
          "Lỗi",
          "Không thể kết nối được với server.\n\nXin vui lòng thử lại sau ít phút..."
        );
        console.error(error);
      });
  }

  getStatusColor(status) {
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
    }
  }

  onValueChange(value) {
    //send data to server
    var data = {
      order_id: this.props.order_id,
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
        // console.log(response);
      })
      .catch(error => {
        Alert.alert(
          "Lỗi",
          "Không thể kết nối được với server.\n\nXin vui lòng thử lại sau ít phút..."
        );
        console.error(error);
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
                <View>
                  <Text style={styles.titleText}>Thông tin khách hàng</Text>

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

                  <Text style={styles.titleText}>Tình trạng đơn hàng</Text>
                  <Card>
                    <Picker
                      supportedOrientations={["portrait", "landscape"]}
                      iosHeader="Select one"
                      mode="dropdown"
                      onValueChange={this.onValueChange.bind(this)}
                      selectedValue={this.state.selected1}
                      style={{ color: this.state.statusColor }}
                    >
                      <Item label="CHỜ XÁC NHẬN" value="-1" />
                      <Item label="CHỜ GIAO HÀNG" value="-11" />
                      <Item label="ĐANG GIAO HÀNG" value="0" />
                      <Item label="HOÀN THÀNH" value="1" />
                      <Item label="TRẢ HÀNG/HOÀN TIỀN" value="-12" />
                      <Item label="ĐÃ HỦY" value="-2" />
                    </Picker>
                  </Card>

                  <Text style={styles.titleText}>Thông tin đơn hàng</Text>
                  <Card>
                    <CardItem>
                      <Left>
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
                          <Text style={styles.textLeft}>Phí vận vhuyển</Text>
                          <Text style={styles.textLeft}>Phí thu hộ</Text>
                          <Text style={styles.textLeft}>Sử dụng M-coin</Text>
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
                  <Text style={styles.titleText}>Sản phẩm trong đơn hàng</Text>
                  <Card>
                    <List
                      dataArray={this.state.orderProducts}
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
              );
            }
          }).bind(this)()}
        </Content>
      </Container>
    );
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

export default OrderDetail;
// function mapStateToProps(state) {
//   return {
//     info: state.info
//   };
// }
// export default connect(mapStateToProps)(OrderScreen);
