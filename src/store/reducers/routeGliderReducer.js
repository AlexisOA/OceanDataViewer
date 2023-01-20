import {ROUTE_GLIDER} from "../actions/routeGliderActions"

let routeDataGlider = null

export const stateRouteDataGlider = (state=routeDataGlider, action)=> {
    switch (action.type) {
        case ROUTE_GLIDER:
            return action.payload.data
        default:
            return state;
    }
}