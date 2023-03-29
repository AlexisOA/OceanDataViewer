import {POPUP_DATA} from "../actions/dataPoupActions"
let datapopUp = null

export const PopUpReducer = (state=datapopUp, action)=> {
    switch (action.type) {
        case POPUP_DATA:
            return action.payload.data

        default:
            return state;
    }
}