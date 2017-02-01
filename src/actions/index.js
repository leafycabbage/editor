export const SELECT = 'SELECT'
export const CREATE_BLOCK = 'CREATE_BLOCK'
export const DELETE_BLOCK = 'DELETE_BLOCK'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'

export const select = (nodeId) => ({
    type: SELECT,
    nodeId
})

let nextId = 0
export const createBlock = (layout) => ({
    type: CREATE_BLOCK,
    nodeId: `new_${nextId++}`,
    layout: []
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})
