import { ActionTypes } from "../constants/action-types";

export const addItemList = () => ({
  type: ActionTypes.ADD_ITEM_LIST,
});
export const editItemListField = (value, props, field) => ({
  type: ActionTypes.EDIT_ITEM_LIST_FIELD,
  value,
  props,
  field,
});
export const deleteItemList = (row) => ({
  type: ActionTypes.DELETE_ITEM_LIST,
  payload: row,
});
export const addAllItemList = (itemList) => ({
  type: ActionTypes.ADD_ALL_ITEM_LIST,
  payload: itemList,
});
