import { ActionTypes } from "../constants/action-types";
const initialState = [];
export const monitoringDatesReducers = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MONITORING_DATES_LIST:

            return action.payload;
        default:
            return state;
    }
};
