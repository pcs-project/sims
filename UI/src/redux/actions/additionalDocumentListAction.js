import { ActionTypes } from "../constants/action-types";

export const addDocumentList = (data) => ({
  type: ActionTypes.ADD_DOCUMENT_LIST,
  payload: data,
});
export const editDocumentListField = (value, props, field) => ({
  type: ActionTypes.EDIT_DOCUMENT_LIST,
  value,
  props,
  field,
});
export const deleteDocumentList = (row) => ({
  type: ActionTypes.DELETE_DOCUMENT_LIST,
  payload: row,
});
export const addAllDocumentList = (documentList) => ({
  type: ActionTypes.ADD_ALL_DOCUMENT_LIST,
  payload: documentList,
});
