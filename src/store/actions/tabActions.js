export const STATUS_PLOT_TAB = 'STATUS_PLOT_TAB'
export const STATUS_PRODUCT_TAB = 'STATUS_PRODUCT_TAB'
export const SELECT_TAB = 'SELECT_TAB'


export const getStatusPlotTab= (data, url) => {
    return {
        type: STATUS_PLOT_TAB,
        payload: {
            data,
            url
        }
    }
}

export const getStatusProductTab= (data, url) => {
    return {
        type: STATUS_PRODUCT_TAB,
        payload: {
            data,
            url
        }
    }
}

export const getSelectTab= (data) => {
    return {
        type: SELECT_TAB,
        payload: {
            data
        }
    }
}