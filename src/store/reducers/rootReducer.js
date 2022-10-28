import { combineReducers } from "redux";
import { dataHighchartReducer, dataTransferList } from "./statusHighchartReducer";
import { TabPlotReducer, TabProductReducer, TabSelect } from "./statusTabReducer";


export const rootReducer = combineReducers(
    {
        // state name : reduce that will control it
        statusPlotTab: TabPlotReducer,
        statusProductTab: TabProductReducer,
        statusSelect: TabSelect,
        dataHighchart:dataHighchartReducer,
        transferListData:dataTransferList
        //... add more states and reducers to include them in the store
    }
)