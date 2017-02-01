import {DefaultDraftBlockRenderMap} from 'draft-js';
import Immutable from 'immutable';

const blockRenderMap = Immutable.Map({
    'block': {
        element: 'section'
    }
});

// keep support for other draft default block types and add our myCustomBlock type
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export {extendedBlockRenderMap};
