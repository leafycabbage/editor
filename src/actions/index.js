export const SELECT = 'SELECT'

export const select = (nodeType, nodeId) => ({
    type: SELECT,
    nodeType: nodeType,
    nodeId: nodeId
})

export const CREATE_CONTENT = 'CREATE_CONTENT'
export const MODIFY_CONTENT = 'MODIFY_CONTENT'

let contentId = 0
export const createContent = () => ({
    type: CREATE_CONTENT,
    layoutId: `content_${contentId++}`
})

export const modifyContent = (contentId, content) => ({
    type: MODIFY_CONTENT,
    contentId,
    content
})

export const CREATE_LAYOUT = 'CREATE_LAYOUT'
export const MODIFY_LAYOUT = 'MODIFY_LAYOUT'

let layoutId = 0
export const createLayout = (layout) => ({
    type: CREATE_LAYOUT,
    layoutId: `layout_${layoutId++}`,
    layout
})

export const modifyLayout = (layoutId, layout) => ({
    type: MODIFY_LAYOUT,
    layoutId,
    layout
})

export const CREATE_BLOCK = 'CREATE_BLOCK'
export const ADD_CHILD = 'ADD_CHILD'
export const ADD_CONTENT = 'ADD_CONTENT'

let blockId = 0
export const createBlock = (contentId) => ({
    type: CREATE_BLOCK,
    blockId: `block_${blockId++}`
})

export const addChild = (blockId, childId, layoutId) => ({
    type: ADD_CHILD,
    blockId,
    childId,
    layoutId
})

export const addContent = (blockId, contentId) => ({
    type: ADD_CONTENT,
    blockId,
    contentId
})
