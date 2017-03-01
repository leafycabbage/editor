export const SELECT = 'SELECT';

export default function editor(state = {
    selected: {
        type: "",
        id: 0
    }
}, action) {
    switch(action.type) {
    case SELECT:
        return Object.assign({}, state, {
            selected: {
                type: action.nodeType,
                id: action.nodeId
            }
        });

    default:
        return state;
    }
}
