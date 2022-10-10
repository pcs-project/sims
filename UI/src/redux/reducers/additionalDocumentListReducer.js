import { ActionTypes } from "../constants/action-types";
const initialState = [];

export const additionalDocumentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DOCUMENT_LIST:
      return [
        ...state,
        {
          sno: state.length + 1,
          documentName: action.payload.documentName,
          documentDesc: action.payload.documentDesc,
          documentPage: action.payload.documentPage,
        },
      ];
    case ActionTypes.EDIT_DOCUMENT_LIST:
      const list = [...state];
      list[action.props.rowIndex][action.field] = action.value;
      return [...state];
    case ActionTypes.DELETE_DOCUMENT_LIST:
      const documentList = [...state.filter((document) => document.sno !== action.payload.sno)];
      documentList.map((document, index) => {
        return (document["sno"] = index + 1);
      });
      return documentList;
    case ActionTypes.ADD_ALL_DOCUMENT_LIST:
      const newList = action.payload.map((element, i) => {
        return {
          sno: i + 1,
          documentId: element.documentId,
          documentName: element.documentName,
          documentDesc: element.documentDesc,
          documentPage: element.documentPage,
        };
      });
      return [...newList];
    default:
      return state;
  }
};
