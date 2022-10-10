import { ActionTypes } from "../constants/action-types";

export const addMonitoringDates = (data) => ({
  type: ActionTypes.ADD_MONITORING_DATES_LIST,
  payload: data,
});
