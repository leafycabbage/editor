import { CREATE_BLOCK, ADD_CHILD, REMOVE_CHILD, CHANGE_LAYOUT } from '../actions'

const children = (state, action) => {
    switch (action.type) {
        case ADD_CHILD:
            let currentLg = state ? state.lg : {}

            return {
                lg: {
                    ...currentLg,
                    [action.childId] : action.layoutId
                }
            }
        case REMOVE_CHILD:
            return state.filter(id => id !== action.childId)
        default:
            return state
  }
}

const block = (state, action) => {
    switch (action.type) {
        case CREATE_BLOCK:
            return {
                id: action.blockId
            }
        case ADD_CHILD:
            return {
                ...state,
                layouts: children(state.layouts, action)
            }
        case CHANGE_LAYOUT:
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

export default function map(state = {}, action) {
    const { blockId } = action
    if (typeof blockId === 'undefined') {
        return state
    }

    return {
        ...state,
        [blockId]: block(state[blockId], action)
    }
}
