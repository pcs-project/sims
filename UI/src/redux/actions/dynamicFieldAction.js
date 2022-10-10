import { ActionTypes } from "../constants/action-types";
export const addDynamicFieldList = () => ({
  type: ActionTypes.ADD_DYNAMIC_FIELD_LIST,
});
export const editDynamicField = (value, props, field) => ({
  type: ActionTypes.EDIT_DYNAMIC_FIELD_LIST,
  value,
  props,
  field,
});
export const deleteDynamicFieldList = (row) => ({
  type: ActionTypes.DELETE_DYNAMIC_FIELD_LIST,
  payload: row,
});
export const addAllDynamicFieldList = (dynamicFieldList) => ({
  type: ActionTypes.ADD_ALL_DYNAMIC_FIELD_LIST,
  payload: dynamicFieldList,
});
