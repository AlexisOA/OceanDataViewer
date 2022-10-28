export const HIGHCHARTS_DATA = 'HIGHCHARTS_DATA'
export const TRANSFERLIST_DATA = 'TRANSFERLIST_DATA'

export const setDataFile= (data) => {
    return {
        type: HIGHCHARTS_DATA,
        payload: {
            data
        }
    }
}

export const setTranferlistChoose = (data) => {
    return {
        type: TRANSFERLIST_DATA,
        payload: {
            data
        }
    }
}
