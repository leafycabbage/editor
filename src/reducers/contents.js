import { CREATE_CONTENT, MODIFY_CONTENT } from '../actions'

import {convertFromRaw} from 'draft-js';

const content = (state, action) => {
    switch (action.type) {
        case CREATE_CONTENT:
            const blocks = convertFromRaw(...action.content)

            return {
                ...action.content
            }
        case MODIFY_CONTENT:

            console.log("Content ", action.content)
            return {
                ...state,
                ...action.content
            }

        default:
            return state
    }
}

export default function contents(state = {}, action) {
    const { contentId } = action
    if (typeof contentId === 'undefined') {
        return state
    }

    return {
        ...state,
        [contentId]: content(state[contentId], action)
    }
}
