import { MODAL_OPEN , MODAL_CLOSE } from './modalConstants'


const initialState = null

export const reducer = (state = initialState,payload) => {
    switch(payload.type){
        case MODAL_OPEN:
            const { modalType , modalProps } = payload.payload
            return { modalType , modalProps }
        case MODAL_CLOSE:
            return null
        default:
            return state
    }
}