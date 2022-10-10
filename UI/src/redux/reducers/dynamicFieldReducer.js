import { ActionTypes } from "../constants/action-types";
const initialState = [];
export const dynamicFieldListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DYNAMIC_FIELD_LIST:
      return [
        ...state,
        {
          sno: state.length + 1,
          fieldName: "",
          fieldValue: "",
        },
      ];
    case ActionTypes.EDIT_DYNAMIC_FIELD_LIST:
      const list = [...state];
      list[action.props.rowIndex][action.field] = action.value;
      return [...state];
    case ActionTypes.DELETE_DYNAMIC_FIELD_LIST:
      const dynamicFieldList = [...state.filter((field) => field.sno !== action.payload.sno)];
      dynamicFieldList.map((dynamic, index) => {
        return (dynamic["sno"] = index + 1);
      });
      return dynamicFieldList;
    case ActionTypes.ADD_ALL_DYNAMIC_FIELD_LIST:
      const newList = action.payload.map((element, i) => {
        return {
          sno: i + 1,
          dynamicDataId: element.dynamicDataId,
          fieldName: element.fieldName,
          fieldValue: element.fieldValue,
        };
      });
      return [...newList];
    default:
      return state;
  }
};
