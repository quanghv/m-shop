import { connect } from "react-redux";
import TabScreen from "./index";
import { getListThunk, dataSelected } from "../../actions/index";

class TabFinish extends TabScreen {}

function mapStateToProps(state) {
  return {
    listOrderFinish: state.listOrderFinish,
    getError: state.getError,
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps, { getListThunk, dataSelected })(
  TabFinish
);
