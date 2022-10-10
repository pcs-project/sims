import { ActionTypes } from "../constants/action-types";
// export const addOperatorList = (operatorsList) => ({
//     type: ActionTypes .ADD_OPERATOR_LIST,
//     payload: operatorsList,
//   });
export const addOperatorList = () => ({
  type: ActionTypes.ADD_OPERATOR_LIST,
});
export const editOperatorListField = (value, props, field) => ({
  type: ActionTypes.EDIT_OPERATOR_LIST_FIELD,
  value,
  props,
  field,
});
export const deleteOperatorList = (row) => ({
  type: ActionTypes.DELETE_OPERATOR_LIST,
  payload: row,
});
export const addAllOperatorList = (operatorList) => ({
  type: ActionTypes.ADD_ALL_OPERATOR_LIST,
  payload: operatorList,
});
