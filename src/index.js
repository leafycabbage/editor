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

import BlockEditor from './components/BlockEditor';
import BlockItem from './components/BlockItem';

import React from 'react';
import ReactDOM from 'react-dom';

import {WidthProvider, Responsive} from 'react-grid-layout';
var ResponsiveReactGridLayout = WidthProvider(Responsive);

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let tree = {
    layout: {
        root: {
            id: "root",
            layouts: {
                lg: [{i: "child1", x: 0, y: 0, w: 8, h: 2}, {i: "child2", x: 8, y: 0, w: 4, h: 2}]
            }
        },
        child1: {
            id: "child1",
            layouts: {
                lg: []
            }
        },
        child2: {
            id: "child2"
        }
    }
}

const store = createStore(reducer, tree)

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <BlockItem id="root">
                Yoohoo
            </BlockItem>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('test')
);

/*ReactDOM.render(
  <BlockEditor>
    <section>
        This is the main section
    </section>
  </BlockEditor>,
  document.getElementById('target')
);*/
