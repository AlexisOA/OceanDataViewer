import {LOADING_MARKER_MAP} from "../actions/LoadingActions"

let statusLoadingMarker = false

export const stateLoadingMarker = (state=statusLoadingMarker, action)=> {
    switch (action.type) {
        case LOADING_MARKER_MAP:
            return action.payload.data
        default:
            return state;
    }
}