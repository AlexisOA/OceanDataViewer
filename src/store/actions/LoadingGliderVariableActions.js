export const DATA_GLIDER_VAR_LOADING = 'DATA_GLIDER_VAR_LOADING'

export const setDataGliderVariableLoading = (data) => {
    return {
        type: DATA_GLIDER_VAR_LOADING,
        payload: {
            data
        }
    }
}