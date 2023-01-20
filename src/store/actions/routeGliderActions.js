export const ROUTE_GLIDER = 'ROUTE_GLIDER'

export const setDataRoute= (data) => {
    return {
        type: ROUTE_GLIDER,
        payload: {
            data
        }
    }
}