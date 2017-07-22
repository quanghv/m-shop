import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppHeader from "../layout/AppHeader";
import NetworkError from "../layout/NetworkError";
import { getListThunk, dataSelected } from "../actions/index";
import { Actions } from "react-native-router-flux";

import {
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableHighlight
} from "react-native";
import { Container, Content, Card, CardItem, Body, Spinner } from "native-base";

import constant from "../constant";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: true,
      data: [],
      refreshing: false,
      endLoadMore: false
    };
  }
  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    //refresh (Action back while data changed)
    let propsData = nextProps.data;
    if (nextProps.value) {
      propsData.data = false;
      Actions.refresh({ value: false });
      this.handleRefresh();
    }

    //console.log(nextProps.data, "data fetched");
    this.setState({
      data: propsData,
      loading: false,
      endLoadMore: nextProps.data.length % constant.PAGE_SIZE ? true : false
    });
  }

  handleRefresh = () => {
    console.log("refreshing...");
    setTimeout(() => {
      this.setState(
        {
          page: 1,
          data: []
        },
        () => {
          this.getData();
        }
      );
      this.setState({
        refreshing: false
      });
    }, 3000);
  };

  handleEndReached = () => {
    console.log(this.state.endLoadMore);
    if (!this.state.endLoadMore && !this.state.loading) {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => this.getData()
      );
    } else {
      console.log("No loadmore");
    }
  };

  getData() {
    this.props.getListThunk(this.state.page, this.state.data);
  }

  render() {
    // console.log(this.props, "data latest");
    console.log(this.state, "state data latest");
    if (this.props.data === constant.NETWORK_ERROR) {
      return (
        <Container>
          <AppHeader isHome="true" />
          <NetworkError error={this.state.data} />
        </Container>
      );
    } else if (this.state.data != undefined && this.props.data.length > 0) {
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
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={this.props.data}
              renderItem={this.renderItem}
              ListFooterComponent={this.renderFooter}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />
              }
              onEndReachedThreshold={0.3}
              onEndReached={this.handleEndReached}
              contentContainerStyle={{
                borderBottomWidth: 0,
                borderTopWidth: 0
              }}
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
      <TouchableHighlight
        onPress={() => {
          Actions.orderInfo({ order_id: item.id });
          this.props.dataSelected(item);
        }}
      >
        <CardItem>
          <Body>
            <Text style={{ fontWeight: "bold" }}>
              {item.code}
            </Text>
            <Text>
              {item.total_price}
            </Text>
            <Text style={{ fontStyle: "italic", marginBottom: 10 }}>
              {item.update_time}
            </Text>
            {(() => {
              switch (item.status) {
                case "1":
                  return (
                    <Text style={{ color: "#2E7D32" }}>
                      {"HOÀN THÀNH"}
                    </Text>
                  );
                case "-1":
                  return (
                    <Text style={{ color: "#BF360C" }}>
                      {"CHỜ XÁC NHẬN"}
                    </Text>
                  );
                case "-11":
                  return (
                    <Text style={{ color: "#FF5722" }}>
                      {"CHỜ GIAO HÀNG"}
                    </Text>
                  );
                case "0":
                  return (
                    <Text style={{ color: "#1976D2" }}>
                      {"ĐANG GIAO HÀNG"}
                    </Text>
                  );
                case "-12":
                  return (
                    <Text style={{ color: "#B0BEC5" }}>
                      {"TRẢ HÀNG/HOÀN TIỀN"}
                    </Text>
                  );
                default:
                  return (
                    <Text style={{ color: "#7f8c8d" }}>
                      {"ĐÃ HỦY"}
                    </Text>
                  );
              }
            })()}
            <Text style={{ fontStyle: "italic", color: "brown" }}>
              {item.note}
            </Text>
          </Body>
        </CardItem>
      </TouchableHighlight>
    </Card>;

  renderFooter = () => {
    if (!this.state.endLoadMore) return <Spinner />;
    return (
      <View>
        <Body style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text>Đã hết dữ liệu</Text>
        </Body>
      </View>
    );
  };
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
