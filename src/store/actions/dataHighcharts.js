export const DATA_HIGHCHARTS = 'DATA_HIGHCHARTS'

export const setDataHighcharts = (data) => {
    return {
        type: DATA_HIGHCHARTS,
        payload: {
            data
        }
    }
}