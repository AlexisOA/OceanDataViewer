import { combineReducers } from "redux";
import { dataHighchartReducer, dataTransferList } from "./statusHighchartReducer";
import { TabPlotReducer, TabProductReducer, TabSelect } from "./statusTabReducer";
import {getSizeWindow} from "./windowReduces"
import { stateLoadingMarker } from "./loadingReducer";
import { stateRouteDataGlider } from "./routeGliderReducer";
import { PopUpReducer } from "./dataPoupReducer";
import { getDataHighcharts } from "./dataHighchartsReducer";
import {getDataVariableGlider} from "./dataGliderVariablesReducer";
import {getDataVariableGliderLoading} from "./LoadingGliderVariableReducer";

export const rootReducer = combineReducers(
    {
        // state name : reduce that will control it
        statusPlotTab: TabPlotReducer,
        statusProductTab: TabProductReducer,
        statusSelect: TabSelect,
        dataHighchart:dataHighchartReducer,
        transferListData:dataTransferList,
        getSizeWindowMap: getSizeWindow,
        StateLoading :stateLoadingMarker,
        stateRouteGlider: stateRouteDataGlider,
        popUpData: PopUpReducer,
        dataHigcharting: getDataHighcharts,
        dataGliderVar: getDataVariableGlider,
        dataGliderVarLoading: getDataVariableGliderLoading
        //... add more states and reducers to include them in the store
    }
)