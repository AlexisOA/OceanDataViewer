export const LOADING_MARKER_MAP = 'LOADING_MARKER_MAP'

export const setStateLoading= (data) => {
    return {
        type: LOADING_MARKER_MAP,
        payload: {
            data
        }
    }
}
