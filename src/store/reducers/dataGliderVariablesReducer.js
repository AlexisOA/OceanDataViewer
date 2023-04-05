import {DATA_GLIDER_VAR} from "../actions/dataGliderVariablesActions"

let dataGliderVar = null

export const getDataVariableGlider = (state=dataGliderVar, action)=> {
    switch (action.type) {
        case DATA_GLIDER_VAR:
            return action.payload.data

        default:
            return state;
    }
}