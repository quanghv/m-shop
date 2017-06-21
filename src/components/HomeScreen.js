import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import { getListThunk, dataSelected } from "../actions/index";
import { Actions } from "react-native-router-flux";

import { View, Text, RefreshControl, FlatList } from "react-native";
import { Container, Content, Card, CardItem, Body, Spinner } from "native-base";

import constant from "../constant";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      loadMore: true,
      refreshing: false,
      endLoadMore: false
    };
  }
  componentWillMount() {
    this.getData(true);
  }

  componentWillReceiveProps(nextProps) {
    //refresh (Action back while data changed)
    if (nextProps.value) {
      Actions.refresh({ value: false, data: [] });
      this.handleRefresh();
    }

    console.log("here");
    //handle data
    if (this.state.loadMore) {
      this.setState({
        loadMore: false,
        data: this.state.page == 1
          ? nextProps.data
          : [...this.state.data, nextProps.data],
        endLoadMore: nextProps.data.length == constant.PAGE_SIZE ? false : true
      });
    }
  }

  handleRefresh = () => {
    console.log("refreshing...");
    this.getData(true);
    this.setState({
      refreshing: false
    });
  };

<<<<<<< HEAD
                <Body>
                  <Text style={{ fontWeight: "bold" }}>{articleData.code}</Text>
                  <Text>{articleData.total_price}</Text>
                  <Text style={{ fontStyle: "italic", marginBottom: 10 }}>
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
=======
  handleEndReached = () => {
    if (!this.state.endLoadMore) {
      this.setState({
        page: firstLoad ? 1 : this.state.page + 1,
        loadMore: true
      });
      this.getData();
      console.log("onEndReached");
    } else {
      console.log("No loadmore");
    }
  };

  getData(firstLoad){
    console.log("state",this.state);
    this.props.getListThunk(this.state.page);
  };
>>>>>>> afc1c0e8f3bdc93508677bbd361557977e00293c

  render() {
    console.log(this.props.data.length, "total order");
    if (this.state.data.length > 0) {
      console.log("data", this.state.data.length);
      return (
        <Container>
          <AppHeader isHome="true" />
          <View
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: "#f0f0f0"
            }}
          >
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />
              }
              onEndReachedThreshold={0.5}
              onEndReached={this.handleEndReached}
            />
          </View>
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

  renderItem = ({ item }) =>
    <Card>
      <CardItem
        button
        onPress={() => {
          Actions.orderInfo();
          this.props.dataSelected(item);
        }}
      >
        <Body>
          <Text style={{ fontWeight: "bold" }}>{item.code}</Text>
          <Text>{item.total_price}</Text>
          <Text style={{ fontStyle: "italic" }}>
            {item.update_time}
          </Text>
          {(() => {
            switch (item.status) {
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
            {item.note}
          </Text>
        </Body>
      </CardItem>
    </Card>;
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
