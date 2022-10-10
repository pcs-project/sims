import { ActionTypes } from "../constants/action-types";
import moment from "moment";
const initialState = [];
export const operatorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_OPERATOR_LIST:
      return [
        ...state,
        {
          sno: state.length + 1,
          operatorType: "",
          letterNo: "",
          letterDate: null,
          chalaniNo: "",
          fileUpload: "",
          filePage: "",
        },
      ];
    case ActionTypes.EDIT_OPERATOR_LIST_FIELD:
      if (action.field === "letterDate") {
        const list = [...state];
        list[action.props.rowIndex][action.field] = moment(action.value).format("YYYY-MM-DD");
      } else {
        const list = [...state];
        list[action.props.rowIndex][action.field] = action.value;
      }

      return [...state];
    case ActionTypes.DELETE_OPERATOR_LIST:
      const operatorList = [...state.filter((operator) => operator.sno !== action.payload.sno)];
      operatorList.map((operator, index) => {
        return (operator["sno"] = index + 1);
      });
      return operatorList;
    case ActionTypes.ADD_ALL_OPERATOR_LIST:
      const newList = action.payload.map((element, i) => {
        return {
          sno: i + 1,
          voipOperatorId: element.voipOperatorId,
          operatorType: element.operatorType,
          letterNo: element.letterNo,
          letterDate: element.letterDate,
          chalaniNo: element.chalaniNo,
          fileUpload: element.fileUpload,
          filePage: element.filePage,
        };
      });
      return [...newList];
    default:
      return state;
  }
};
