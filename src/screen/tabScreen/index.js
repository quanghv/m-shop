import React from "react";
import {
  View,
  RefreshControl,
  FlatList,
  TouchableHighlight
  // ActivityIndicator
} from "react-native";
import { Container, Card, CardItem, Body, Spinner, Text } from "native-base";

import AppBase from "../../layout/AppBase";
// import { hasError } from "../../helper/apiHelper";
import constant from "../../constant";

export default class TabScreen extends AppBase {
  constructor(props) {
    super(props);

    let status = constant.STATUS.CONFIRM;
    switch (this.props.navigation.state.key) {
      case "TabConfirm":
        status = constant.STATUS.CONFIRM;
        break;
      case "TabShipping":
        status = constant.STATUS.CONFIRM_SHIPPING;
        break;
      case "TabFinish":
        status = constant.STATUS.FINISH;
        break;
      case "TabCancel":
        status = constant.STATUS.CANCEL;
        break;
      default:
        break;
    }

    this.state = {
      page: 1,
      data: undefined,
      orderStatus: status,
      refreshing: false,
      endLoadMore: false
    };
  }
  componentWillMount() {
    this.getData();
  }

  // componentDidMount() {
  //   this.getData();
  // }

  componentWillReceiveProps(nextProps) {
    //refresh (Action back while data changed)
    let propsData;
    switch (this.state.orderStatus) {
      case constant.STATUS.SHIPPING:
        propsData = nextProps.listOrderShipping;
        break;
      case constant.STATUS.FINISH:
        propsData = nextProps.listOrderFinish;
        break;
      case constant.STATUS.CANCEL:
        propsData = nextProps.listOrderCancel;
        break;
      case constant.STATUS.CONFIRM:
        propsData = nextProps.listOrderConfirm;
        break;
      default:
        break;
    }

    if (nextProps.value) {
      // Actions.refresh({ value: false });
      this.handleRefresh();
    }

    //console.log(nextProps.data, "data fetched");
    this.setState({
      data: propsData,
      endLoadMore:
        propsData !== null &&
        propsData !== undefined &&
        propsData.length % constant.PAGE_SIZE
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("DID UPDATE");
  // }

  getData() {
    this.props.getListThunk(
      this.state.page,
      this.state.data,
      this.state.orderStatus
    );
  }

  handleRefresh = () => {
    // console.log("refreshing...");
    this.setState(
      {
        page: 1,
        data: undefined
      },
      () => {
        this.getData();
      }
    );
    this.setState({
      refreshing: false
    });
  };

  handleEndReached = () => {
    // console.log(this.state.endLoadMore);
    if (!this.state.endLoadMore && !this.props.isLoading) {
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

  onOrderPress = item => {
    this.props.navigation.navigate("OrderDetail", {
      orderId: item.id,
      selected: item.status,
      refreshFunc: this.handleRefresh
    });
  };

  renderItem = ({ item }) =>
    <Card>
      <TouchableHighlight onPress={() => this.onOrderPress(item)}>
        <CardItem style={{ borderRadius: 0 }}>
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
                case constant.STATUS.FINISH:
                  return <Text style={{ color: "#2E7D32" }}>HOÀN THÀNH</Text>;
                case constant.STATUS.CONFIRM:
                  return (
                    <Text style={{ color: "#BF360C" }}>
                      {"CHỜ XÁC NHẬN"}
                    </Text>
                  );
                case constant.STATUS.CONFIRM_SHIPPING:
                  return (
                    <Text style={{ color: "#FF5722" }}>
                      {"CHỜ GIAO HÀNG"}
                    </Text>
                  );
                case constant.STATUS.SHIPPING:
                  return (
                    <Text style={{ color: "#1976D2" }}>
                      {"ĐANG GIAO HÀNG"}
                    </Text>
                  );
                case constant.STATUS.CANCEL_USER:
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
    if (this.state.data.length < 10) return null;
    if (!this.state.endLoadMore) {
      return (
        <View>
          <Body>
            <Spinner />
            <Text>Đang tải thêm dữ liệu...</Text>
          </Body>
        </View>
      );
    }
    return (
      <View>
        <Body style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text>Đã hết dữ liệu</Text>
        </Body>
      </View>
    );
  };

  render() {
    let view;

    if (this.props.getError) {
      view = this.renderNetworkError();
    } else if (this.props.isLoading) {
      view = this.renderLoading();
    } else if (
      this.state.data !== null &&
      this.state.data !== undefined &&
      this.state.data.length > 0
    ) {
      // const navigation = this.props.navigation;
      view = (
        <Container>
          {/*<AppHeader isHome="true" />*/}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 2,
              backgroundColor: "#f0f0f0"
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={this.state.data}
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
      view = this.renderNoData();
    }
    return view;
  }
}
