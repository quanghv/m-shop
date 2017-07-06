import { connect } from "react-redux";
import TabScreen from "./index";
import { getListThunk, dataSelected } from "../../actions/index";

class TabCancel extends TabScreen {}

function mapStateToProps(state) {
  return {
    listOrderCancel: state.listOrderCancel,
    getError: state.getError,
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps, { getListThunk, dataSelected })(
  TabCancel
);
