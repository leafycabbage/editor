export const SELECT = 'SELECT';

export default function editor(state = {
    selectedNode: 0
}, action) {
    switch(action.type) {
    case SELECT:
        return Object.assign({}, state, {
            selectedNode: action.nodeId
        });

    default:
        return state;
    }
}
