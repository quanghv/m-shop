import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk, dataSelected } from "../actions/index";
import { Actions } from "react-native-router-flux";

import { View, Text } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Title,
  Spinner,
  List,
  ListItem
} from "native-base";

class HomeScreen extends React.Component {
  componentWillMount() {
    this.props.getListThunk();
  }
  render() {
    // console.log(this.props, "hẻh");
    if (this.props.data.length > 0) {
      // console.log(this.props, "after fetch");
      let articles = this.props.data.map(
        function(articleData, index) {
          //if (index == 1) console.log(articleData);
          return (
            <Card key={articleData.id}>
              <CardItem
                button
                onPress={() => {
                  Actions.orderInfo();
                  this.props.dataSelected(articleData);
                }}
              >
                <Body>
                  <Text style={{ fontWeight: "bold" }}>{articleData.code}</Text>
                  <Text>{articleData.total_price}</Text>
                  <Text style={{ fontStyle: "italic" }}>
                    {articleData.update_time}
                  </Text>
                  {(() => {
                    switch (articleData.status) {
                      case "1":
                        return (
                          <Text style={{ color: "darkgreen" }}>
                            {"Thành công".toLocaleUpperCase()}
                          </Text>
                        );
                      case "0":
                        return (
                          <Text style={{ color: "#62B1F6" }}>
                            {"Đang giao hàng".toLocaleUpperCase()}
                          </Text>
                        );
                      case "-1":
                        return (
                          <Text style={{ color: "darkred" }}>
                            {"Chờ xác nhận".toLocaleUpperCase()}
                          </Text>
                        );
                      default:
                        return (
                          <Text style={{ color: "gray" }}>
                            {"Đã hủy".toLocaleUpperCase()}
                          </Text>
                        );
                    }
                  })()}
                  <Text style={{ fontStyle: "italic", color: "brown" }}>
                    {articleData.note}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          );
        }.bind(this)
      );
      return (
        <Container>
          <AppHeader isHome="true" />
          <Content padder>

            {/*<List
              dataArray={this.props.data}
              renderRow={item =>
                <ListItem>
                  <Card>
                    <CardItem
                      button
                      onPress={() => {
                        Actions.orderInfo();
                        console.log(item);
                        this.props.dataSelected(item);
                      }}
                    >
                      <Text>AAA</Text>
                    </CardItem>
                  </Card>
                </ListItem>}
            />*/}

            {articles}
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <AppHeader isHome="true" />
          <Content padder>
            <Body>
              <Spinner />
            </Body>
          </Content>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getListThunk: getListThunk,
      dataSelected: dataSelected
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);
