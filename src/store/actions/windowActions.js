export const WINDOWS_SIZE = 'WINDOWS_SIZE'

export const setSizeWindow= (width, height) => {
    return {
        type: WINDOWS_SIZE,
        payload: {
            width,
            height
        }
    }
}