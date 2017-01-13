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

import React from 'react';

import Block from './Block.js';

import {WidthProvider, Responsive} from 'react-grid-layout';
var ResponsiveReactGridLayout = WidthProvider(Responsive);

class BlockItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editAsGridMode: false,

            layout: []
        }

        this._remove = () => {
            this.props.onRemove();
        }

        this._editAsGrid = () => {
            this.setState({
                editAsGridMode: true
            })
        }

        this._onLayoutChange = layout => {
            console.log(layout)

            this.setState({
                layout: layout
            })
        }
    }

    render() {
        var gridStyle = {
            position: 'absolute',
            right: '20px',
            top: 0,
            cursor: 'pointer'
        }

        var remove = null;
        if (this.props.onRemove === "function") {
            var removeStyle = {
                position: 'absolute',
                right: '2px',
                top: 0,
                cursor: 'pointer'
            };

            remove = <span className="remove" style={removeStyle} onClick={this._remove.bind(this)}>x</span>
        }

        var editAsGridPanel = null;
        if (this.state.editAsGridMode) {
            editAsGridPanel =
                <Block />
        }

        console.log(this.props)
        return (
            <div {...this.props}>
                {this.props.children}

                <span className="gridadd" style={gridStyle} onClick={this._editAsGrid.bind(this)}>grid</span>
                {remove}
                {editAsGridPanel}
            </div>
        )
    }
}

export default BlockItem;
