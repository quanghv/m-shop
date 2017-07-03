import TabScreen from "./index";
import { connect } from "react-redux";
import { getListThunk, dataSelected } from "../actions/index";

class Confirm extends TabScreen {}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps, { getListThunk, dataSelected })(
  Confirm
);
