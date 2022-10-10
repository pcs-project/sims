import { ActionTypes } from "../constants/action-types";
const initialState = [{ sno: 1, name: "", designation: "" }];
export const monitoringTeamReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MONITORING_TEAM_LIST:
      return [
        ...state,
        {
          sno: state.length + 1,
          name: "",
          designation: "",
        },
      ];
    case ActionTypes.EDIT_MONITORING_TEAM_LIST:
      const list = [...state];
      list[action.index][action.field] = action.value;
      return [...state];
    case ActionTypes.DELETE_MONITORING_TEAM_LIST:
      const monitoringTeamList = [...state.filter((team) => team.sno !== action.payload.sno)];
      monitoringTeamList.map((team, index) => {
        return (team["sno"] = index + 1);
      });
      return monitoringTeamList;
    case ActionTypes.ADD_ALL_MONITORING_TEAM_LIST:
      const newList = action.payload.map((element, i) => {
        return {
          sno: i + 1,
          monitoringTeamId: element.monitoringTeamId,
          name: element.name,
          designation: element.designation,
        };
      });
      return [...newList];
    default:
      return state;
  }
};
