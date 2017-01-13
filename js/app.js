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

'use strict';

import BlockEditor from './components/BlockEditor';
import BlockItem from './components/BlockItem';

import React from 'react';
import ReactDOM from 'react-dom';

import {WidthProvider, Responsive} from 'react-grid-layout';
var ResponsiveReactGridLayout = WidthProvider(Responsive);

/*
ReactDOM.render(
    <ResponsiveReactGridLayout isResizable={true} isDraggable={false} className="layout">
        <BlockItem key="a" data-grid={{x: 0, y: 0, w: 12, h: 2}}>
            Yoohoo
        </BlockItem>
    </ResponsiveReactGridLayout>,
    document.getElementById('test')
);*/

ReactDOM.render(
  <BlockEditor>
    <section>
        This is the main section
    </section>
  </BlockEditor>,
  document.getElementById('target')
);
