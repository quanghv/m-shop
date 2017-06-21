import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk, dataSelected } from "../actions/index";
import { Actions } from "react-native-router-flux";

import { View, Text, ListView, RefreshControl, OnEn } from "react-native";
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

class HomeScreenBK extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoadMore: false,
      loadMoreAtY: 100
    };
  }
  componentWillMount() {
    // console.log("runHere?");
    this.props.getListThunk();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, "next Props");
    if (nextProps.value) {
      // console.log("value true");
      Actions.refresh({ value: false, data: [] });
      this._onRefresh();
      // this.props.getListThunk();
    }
  }
  _onRefresh() {
    this.props.getListThunk();
  }
  _onEndReached() {
    console.log("test");
  }

  setCurrentReadOffset = event => {
    // Log the current scroll position in the list in pixels
    // console.log(event.nativeEvent);
    // console.log("state", this.state);
    if (
      !this.state.onLoadMore &&
      event.nativeEvent.contentOffset.y >= this.state.loadMoreAtY
    ) {
      console.log(
        event.nativeEvent.contentOffset.y + "|" + this.state.loadMoreAtY
      );
      console.log("LoadMoreNow");
      this.setState({
        onLoadMore: true
      });
    }
  };
  
  /**
   * calculate 
   * 
   * @param {any} event 
   * 
   * @memberof HomeScreen
   */
  measureView(index, event) {
    this.setState({
      loadMoreAtY: event.nativeEvent.layout.y
    });
    console.log("event properties: ", event.nativeEvent);
  }

  render() {
    // console.log(this.props, "run here");
    if (this.props.data.length > 0) {
      // console.log(this.props, "after fetch");
      // console.log("data length", this.props.data.length);
      let articles = this.props.data.map(
        function(articleData, index) {
          //if (index == 1) console.log(articleData);
          return (
            <Card
              onLayout={
                this.props.data.length - 5 == index
                  ? event => this.measureView(index, event)
                  : null
              }
              style={{ marginLeft: 10, marginRight: 10 }}
              key={articleData.id}
            >
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
          {/*<Content padder>
            <List
              onEndReached={this._onEndReached.bind(this)}
              onEndReachedThreshold={10}
              dataArray={this.props.data}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
              renderRow={item =>
                <ListItem>
                  <Text>{item.code}</Text>
                </ListItem>}
            />

          </Content>*/}
          <Content
            onScroll={this.setCurrentReadOffset}
            onLayout={event => {
              this.setState({
                layoutHeight: event.nativeEvent.layout.height
              });
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
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
