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

import Block from './components/Block';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {convertFromRaw} from 'draft-js';

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
        content: (
          '\\left( \\sum_{k=1}^n a_k b_k \\right)^{\\!\\!2} \\leq\n' +
          '\\left( \\sum_{k=1}^n a_k^2 \\right)\n' +
          '\\left( \\sum_{k=1}^n b_k^2 \\right)'
        ),
      },
    },
  },
};

let tree = {
    layouts: {
        0: {
            lg: [
                {i: "child1", x: 0, y: 0, w: 8, h: 2},
                {i: "child2", x: 0, y: 0, w: 3, h: 2}
            ]
        }
    },
    contents: {
        0: rawContent,
        1: rawContent
    },
    map: {
        root: {
            id: "root",
            layoutId: 0
        },
        child1: {
            id: "child1",
            contentId: 0
        },
        child2: {
            id: "child2",
            contentId: 1
        }
    }
}

const store = createStore(reducer, tree)

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <div>
                <Block id="root"></Block>
            </div>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

/*ReactDOM.render(
  <BlockEditor>
    <section>
        This is the main section
    </section>
  </BlockEditor>,
  document.getElementById('target')
);*/
