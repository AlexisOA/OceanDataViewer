export const DATA_GLIDER_VAR = 'DATA_GLIDER_VAR'

export const setDataGliderVariable = (data) => {
    return {
        type: DATA_GLIDER_VAR,
        payload: {
            data
        }
    }
}