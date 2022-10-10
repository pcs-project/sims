import { ActionTypes } from "../constants/action-types";

export const addLocationList = () => ({
  type: ActionTypes.ADD_LOCATION_LIST,
});
export const editLocationListField = (value, index, field) => ({
  type: ActionTypes.EDIT_LOCATION_LIST,
  value,
  index,
  field,
});
export const deleteLocationList = (row) => ({
  type: ActionTypes.DELETE_LOCATION_LIST,
  payload: row,
});

export const addAllLocationList = (data) => ({
  type: ActionTypes.ADD_ALL_LOCATION_LIST,
  payload: data,
});
