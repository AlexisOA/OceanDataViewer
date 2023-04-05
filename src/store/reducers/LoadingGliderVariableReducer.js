import {DATA_GLIDER_VAR_LOADING} from "../actions/LoadingGliderVariableActions"

let dataGliderVarLoading = false

export const getDataVariableGliderLoading = (state=dataGliderVarLoading, action)=> {
    switch (action.type) {
        case DATA_GLIDER_VAR_LOADING:
            return action.payload.data

        default:
            return state;
    }
}