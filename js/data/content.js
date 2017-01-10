/**
 * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {convertFromHTML, getSafeBodyFromHTML, ContentState, DefaultDraftBlockRenderMap} from 'draft-js';
import Immutable from 'immutable';
import Block from '../components/Block';
import React from 'react';

const blockRenderMap = Immutable.Map({
    'block': {
        element: 'section'
    }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

var htmlContent = (
    '<h3>This is h3</h3>' +
    '<section>This is a section</section>' +
    '<section>This is a section</section>' +
    '<section>This is a section</section>'
)

/*
var rawContent = {
    blocks: [
        {
            text: 'This is a Draft-based editor that supports TeX rendering.',
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: (
                'Each TeX block below is represented as a DraftEntity object and ' +
                'rendered using Khan Academy\'s KaTeX library.'
            ),
            type: 'unstyled',
        },
        {
            text: '',
            type: 'unstyled',
        },
        {
            text: 'Click any TeX block to edit.',
            type: 'unstyled',
        },
        {
            text: ' ',
            type: 'atomic',
            entityRanges: [{offset: 0, length: 1, key: 'first'}],
        },
        {
            text: 'You can also insert a new TeX block at the cursor location.',
            type: 'unstyled',
        },
    ],

    entityMap: {
        first: {
            type: 'TOKEN',
            mutability: 'IMMUTABLE',
            data: {
                rows: ["a", "b", "c"],
                cols: ["a", "b", "c", "d", "e"]
            },
        },
    },
}; */

const blocksFromHTML = convertFromHTML(htmlContent, getSafeBodyFromHTML, extendedBlockRenderMap);
const content = ContentState.createFromBlockArray(blocksFromHTML);

export {content, blockRenderMap, extendedBlockRenderMap}
