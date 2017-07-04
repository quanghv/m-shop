import TabScreen from "./index";
import { connect } from "react-redux";
import { getListThunk, dataSelected } from "../../actions/index";

class TabShipping extends TabScreen {}

function mapStateToProps(state) {
  return {
    listOrderShipping: state.listOrderShipping,
    getError: state.getError,
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps, { getListThunk, dataSelected })(
  TabShipping
);
