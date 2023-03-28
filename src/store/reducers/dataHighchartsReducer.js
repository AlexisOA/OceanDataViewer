import {DATA_HIGHCHARTS} from "../actions/dataHighcharts"

let dataHighcharts = null

export const getDataHighcharts = (state=dataHighcharts, action)=> {
    switch (action.type) {
        case DATA_HIGHCHARTS:
            return action.payload.data

        default:
            return state;
    }
}