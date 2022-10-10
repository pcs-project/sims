


import { ActionTypes } from "../constants/action-types";
const initialState = [];
export const subLocationSpecificListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SUB_LOCATION_SPECIFIC_LIST:
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
        case ActionTypes.EDIT_SUB_LOCATION_SPECIFIC_LIST:
            const list = [...state];
            list[action.props.rowIndex][action.field] = action.value;
            return [...state];
        case ActionTypes.DELETE_SUB_LOCATION_SPECIFIC_LIST:
            return [...state.filter((item) => item.sno !== action.payload.sno)];
        default:
            return state;
    }
};
