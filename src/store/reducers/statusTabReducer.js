import { STATUS_PLOT_TAB } from "../actions/tabActions";
import { STATUS_PRODUCT_TAB } from "../actions/tabActions";
import { SELECT_TAB } from "../actions/tabActions";

let initialState = {status: true, url:null, url_download:null, isprofile:null};
let initialStateSelect = {status: "source"}

export const TabPlotReducer = (state=initialState, action)=> {
    switch (action.type) {
        case STATUS_PLOT_TAB:
            return {status: action.payload.data,
                url:action.payload.url,
                url_download:action.payload.url_download,
                isprofile: action.payload.isprofile}

        default:
            return state;
    }
}

export const TabProductReducer = (state=initialState, action)=> {
    switch (action.type) {
        case STATUS_PRODUCT_TAB:
            return {status: action.payload.data, url:action.payload.url}

        default:
            return state;
    }
}

export const TabSelect = (state=initialStateSelect, action)=> {
    switch (action.type) {
        case SELECT_TAB:
            return {status: action.payload.data}

        default:
            return state;
    }
}