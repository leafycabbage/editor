import { CREATE_BLOCK, DELETE_BLOCK, ADD_CHILD, REMOVE_CHILD, CHANGE_LAYOUT } from '../actions'

const children = (state, action) => {

    switch (action.type) {
        case ADD_CHILD:
            return [ ...state, action.childId ]
        case REMOVE_CHILD:
            return state.filter(id => id !== action.childId)
        default:
            return state
  }
}

const node = (state, action) => {
    switch (action.type) {
        case CREATE_BLOCK:
            return {
                id: action.nodeId,
                layouts: []
            }
        case ADD_CHILD:
        case REMOVE_CHILD:
            return {
                ...state,
                layouts: {
                    lg: children(state.layouts.lg, action)
                }
            }
        case CHANGE_LAYOUT:
            console.log(action.layout)
            return {
                ...state
            }

        default:
            return state
    }
}


const deleteMany = (state, ids) => {
    state = { ...state }
    ids.forEach(id => delete state[id])
    return state
}

export default function layout(state = {}, action) {
    const { nodeId } = action
    if (typeof nodeId === 'undefined') {
        return state
    }

    return {
        ...state,
        [nodeId]: node(state[nodeId], action)
    }
}
