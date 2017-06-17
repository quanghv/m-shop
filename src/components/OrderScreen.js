import React from "react";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk } from "../actions";
import { Text, StyleSheet } from "react-native";
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
  Spinner
} from "native-base";

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    marginTop: 10
  },
  bold: {
    fontWeight: "bold"
  },
  note: {
    fontStyle: "italic",
    color: "brown"
  }
});

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
      orderProducts: {}
    };
  }

  componentDidMount() {
    let dataUrl =
      "http://m-shop.vn/order-get-detail?order_id=225";// + this.props.info.id;
    fetch(dataUrl)
      .then(e => e.json())
      .then(response => {
          console.log(response, "mount");
        this.setState({
          orderInfo: response.data,
          orderProducts: response.list
        });
        console.log(this.state, "after fetched");
        // dispatch(getList(response.data));
      })
      .catch(error => {
        console.log(error, "error");
      });
  }

  render() {
    console.log(this.props);
      
    let orderObj = this.props.info;
    console.log(this.props);
    return (
      <Container>
        <AppHeader />
        <Content padder>
          <Text style={styles.titleText}>Thông tin khách hàng</Text>

          {/*<Card>
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

          <Text style={styles.titleText}>Thông tin đơn hàng</Text>
          <Card>
            <CardItem>
              <Right>
                <Text>
                  {orderObj.update_time}
                </Text>
                <Text>
                  {orderObj.code}
                </Text>
              </Right>
            </CardItem>
          </Card>*/}
        </Content>
      </Container>
    );
  }
}

export default OrderScreen;

// function mapStateToProps(state) {
//   return {
//     info: state.info
//   };
// }

// export default connect(mapStateToProps)(OrderScreen);
