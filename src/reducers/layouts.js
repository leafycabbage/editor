import { CREATE_LAYOUT, MODIFY_LAYOUT } from '../actions'

const layout = (state, action) => {
    switch (action.type) {
        case CREATE_LAYOUT:
            return {
                ...action.layout
            }
        case MODIFY_LAYOUT:
            return {
                ...state,
                layouts: {
                    lg: action.layout
                }
            }

        default:
            return state
    }
}

export default function layouts(state = {}, action) {
    const { layoutId } = action
    if (typeof layoutId === 'undefined') {
        return state
    }

    return {
        ...state,
        [layoutId]: layout(state[layoutId], action)
    }
}
