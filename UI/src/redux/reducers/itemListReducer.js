import { ActionTypes } from "../constants/action-types";
const initialState = [];
export const itemListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM_LIST:
      return [
        ...state,
        {
          sno: state.length + 1,
          itemName: "",
          itemType: "",
          itemDesc: " ",
          noOfItems: "",
          operatorType: "",
          simSerialNo: [],
        },
      ];
    case ActionTypes.EDIT_ITEM_LIST_FIELD:
      const list = [...state];
      list[action.props.rowIndex][action.field] = action.value;
      return [...state];
    case ActionTypes.DELETE_ITEM_LIST:
      const itemList = [...state.filter((item) => item.sno !== action.payload.sno)];
      itemList.map((item, index) => {
        return (item["sno"] = index + 1);
      });
      return itemList;
    case ActionTypes.ADD_ALL_ITEM_LIST:
      const newList = action.payload.map((element, i) => {
        return {
          sno: i + 1,
          voipItemId: element.voipItemId,
          itemName: element.itemName,
          itemType: element.itemType,
          itemDesc: element.itemDesc,
          noOfItems: element.noOfItems,
          operatorType: element.operatorType,
          simSerialNo: element.simSerialNo,
        };
      });
      return [...newList];
    default:
      return state;
  }
};
