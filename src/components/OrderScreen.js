import React from "react";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk } from "../actions";
import { Text, StyleSheet, Image } from "react-native";
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
  Item,
  List,
  ListItem,
  Thumbnail
} from "native-base";

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

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: null,
      orderProducts: null
    };
  }

  componentDidMount() {
    let dataUrl =
      "http://m-shop.vn/order-get-detail?order_id=" + this.props.info.id;
    fetch(dataUrl)
      .then(e => e.json())
      .then(response => {
        // console.log(response, "mount");
        this.setState({
          orderInfo: response.data.info,
          orderProducts: response.data.list
        });
        console.log(this.state, "after fetched");
        // dispatch(getList(response.data));
      })
      .catch(error => {
        console.log(error, "error");
      });
  }

  render() {
    return (
      <Container>
        <AppHeader />
        <Content padder>
          {(() => {
            if (this.state.orderInfo == null) {
              return <Spinner />;
            } else {
              let orderObj = this.state.orderInfo;
              return <Content>
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
                  <Card>
                    <CardItem>
                      <Picker supportedOrientations={["portrait", "landscape"]} iosHeader="Select one" mode="dropdown">
                        <Item label="Wallet" value="key0" />
                        <Item label="ATM Card" value="key1" />
                        <Item label="Credit Card" value="key2" />
                        <Item label="Debit Card" value="key3" />
                      </Picker>
                    </CardItem>
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
                          <Text
                            style={[styles.textLeft, styles.bold]}
                          >
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
                          <Text style={[styles.textLeft, styles.bold]}>
                            Tình Trạng
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
                              if (orderObj.order_type == "chuyenkhoan") return "Chuyển khoản";
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
                    <List dataArray={this.state.orderProducts} renderRow={item => <ListItem avatar>
                          <Left>
                            <Thumbnail square source={{ uri: item.img }} />
                          </Left>
                          <Body>
                            <Text>{item.name}</Text>
                            <Text>{item.number}</Text>
                            <Text>{item.price_2}</Text>
                          </Body>
                        </ListItem>} />
                  </Card>
                </Content>;
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
