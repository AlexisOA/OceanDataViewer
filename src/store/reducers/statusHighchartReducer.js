import { HIGHCHARTS_DATA, TRANSFERLIST_DATA } from "../actions/highchartActions";

let initialData = null
let initialTransferList = null

export const dataHighchartReducer = (state=initialData, action)=> {
    switch (action.type) {
        case HIGHCHARTS_DATA:
            return action.payload.data

        default:
            return state;
    }
}


export const dataTransferList = (state=initialTransferList, action)=> {
    switch (action.type) {
        case TRANSFERLIST_DATA:
            return action.payload.data

        default:
            return state;
    }
}