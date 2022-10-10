import { ActionTypes } from "../constants/action-types"

export const addSubLocationSpecificList = () => ({
    type: ActionTypes.ADD_ITEM_LIST,
});
export const editSubLocationSpecificListField = (value, props, field) => ({
    type: ActionTypes.EDIT_ITEM_LIST_FIELD,
    value,
    props,
    field,
});
export const deleteSubLocationSpecificList = (row) => ({
    type: ActionTypes.DELETE_ITEM_LIST,
    payload: row
});
