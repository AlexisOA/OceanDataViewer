export const POPUP_DATA = 'POPUP_DATA'

export const getDataFilePopUp= (data) => {
    return {
        type: POPUP_DATA,
        payload: {
            data
        }
    }
}