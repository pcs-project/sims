import { ActionTypes } from "../constants/action-types";
export const addVoipForm = (voipFormData) =>({
    type:ActionTypes.ADD_VOIP_FORM,
    payload:voipFormData
})
