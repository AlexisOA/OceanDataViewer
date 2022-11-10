import { WINDOWS_SIZE } from "../actions/windowActions"

let initialState = {width:null, height:null};

export const getSizeWindow = (state=initialState, action)=> {
    switch (action.type) {
        case WINDOWS_SIZE:
            return {width:action.payload.width, height:action.payload.height}

        default:
            return state;
    }
}