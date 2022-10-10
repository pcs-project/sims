import { combineReducers } from "redux";
import { itemListReducer } from "./itemListReducer"
import { operatorListReducer } from "./operatorListReducer";
import { dynamicFieldListReducer } from "./dynamicFieldReducer";
import { additionalDocumentListReducer } from "./additionalDocumentListReducer";
import { locationListReducer } from "./locationListReducers";
import { monitoringTeamReducers } from "./monitoringTeamReducers";
import { monitoringDatesReducers } from "./monitoringDatesReducers";
import { subLocationSpecificListReducer } from "./subLocationSpecificListReducer";
const reducers = combineReducers({
   itemList: itemListReducer,
   operatorList: operatorListReducer,
   dynamicFieldList: dynamicFieldListReducer,
   documentList: additionalDocumentListReducer,
   locationList: locationListReducer,
   monitoringTeamList: monitoringTeamReducers,
   monitoringDates: monitoringDatesReducers,
   subLocationSpecificList: subLocationSpecificListReducer

})
export default reducers;