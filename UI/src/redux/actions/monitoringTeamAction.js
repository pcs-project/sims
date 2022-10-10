import { ActionTypes } from "../constants/action-types";

export const addMonitoringTeamList = () => ({
  type: ActionTypes.ADD_MONITORING_TEAM_LIST,
});
export const editMonitoringTeamField = (value, index, field) => ({
  type: ActionTypes.EDIT_MONITORING_TEAM_LIST,
  value,
  index,
  field,
});
export const deleteMonitoringTeamList = (row) => ({
  type: ActionTypes.DELETE_MONITORING_TEAM_LIST,
  payload: row,
});
export const addMonitoringTeamListAll = (monitoringTeamList) => ({
  type: ActionTypes.ADD_ALL_MONITORING_TEAM_LIST,
  payload: monitoringTeamList,
});
