import TabScreen from "./index";
import { connect } from "react-redux";
import { getListThunk, dataSelected } from "../../actions/index";

class TabConfirm extends TabScreen {}

function mapStateToProps(state) {
  return {
    listOrderConfirm: state.listOrderConfirm,
    getError: state.getError,
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps, { getListThunk, dataSelected })(
  TabConfirm
);
