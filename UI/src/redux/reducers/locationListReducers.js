import { ActionTypes } from "../constants/action-types";
const initialState = [];
export const locationListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOCATION_LIST:
      return [
        ...state,
        {
          sno: state.length + 1,
          location: "",
          subLocations: [],
        },
      ];
    case ActionTypes.EDIT_LOCATION_LIST:
      const list = [...state];
      list[action.index][action.field] = action.value;
      return [...state];
    case ActionTypes.DELETE_LOCATION_LIST:
      const locationList = [...state.filter((location) => location.sno !== action.payload.sno)];
      locationList.map((location, index) => {
        return (location["sno"] = index + 1);
      });
      return locationList;
    case ActionTypes.ADD_ALL_LOCATION_LIST:
      console.log(action.payload);
      //   const newList = action.payload.map((element, i) => {
      //     console.log(element);
      //     return {
      //       sno: i + 1,
      //       location1: element.location,
      //       subLocations1: [],
      //     };
      //   });

      return [...action.payload];
    default:
      return state;
  }
};
