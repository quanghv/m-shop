import React from "react";
import { Text, TimerMixin } from "react-native";
import { Actions } from "react-native-router-flux";
import { Content, Body, Button, Icon, Spinner } from "native-base";
import constant from "../constant";

export default class NetworkError extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  showLoading() {
    this.setState({
      loading: true
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    this.setState({
      loading: nextProps.error == constant.NETWORK_ERROR ? false : true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update...");
    if (this.state.loading) {
      setTimeout(function() {
        Actions.refresh({ value: true });
      }, 3000);
    }
  }
  componentDidMount() {
    console.log("did mount");
  }

  render() {
    console.log("render...");
    console.log("error state", this.state);
    console.log("error props", this.props);
    return (
      <Content style={{ padding: 20 }}>
        {(() => {
          if (this.state.loading) {
            return <Body><Spinner /><Text>Đang thử kết nối lại</Text></Body>;
          } else {
            return (
              <Body>
                <Icon primary name="sad" />
                <Text />
                <Text>Lỗi khi tải dữ liệu</Text>
                <Button transparent onPress={() => this.showLoading()}>
                  <Icon name="refresh" style={{ fontSize: 12 }} />
                  <Text primary style={{ fontStyle: "italic", fontSize: 12 }}>
                    Nhấn để thử lại
                  </Text>
                </Button>
              </Body>
            );
          }
        })()}
      </Content>
    );
  }
}
