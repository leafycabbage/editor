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

import {convertFromHTML, ContentState} from 'draft-js';

var htmlContent = (
    '<html>' +
        '<head></head>' +
        '<body>' +
            '<header>This is the header</header>' +
            '<nav>This is the nav</nav>' +
            '<main>' +
            'This is the main content' +
            '</main>' +
            '<aside>This is the aside</aside>' +
            '<section>This is a section</section>' +
        '</body>' +
    '</html>'
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

const blocksFromHTML = convertFromHTML(htmlContent);
console.log("Done content")
export var content = ContentState.createFromBlockArray(blocksFromHTML);
