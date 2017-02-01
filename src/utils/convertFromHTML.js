import {convertFromHTML as fn} from 'draft-convert';
import {Entity} from 'draft-js';

const convertFromHTML = fn({
        htmlToEntity: (nodeName, node) => {
            if (nodeName === 'section' || nodeName === 'header') {
                return Entity.create(
                    'BLOCK',
                    'IMMUTABLE',
                    {}
                )
            }
        },
        htmlToBlock: (nodeName, node, lastList) => {
            if (nodeName === 'section' || nodeName === 'header') {
                return {
                    type: 'block',
                    data: {}
                };
            }
        }
    })

export {convertFromHTML}
