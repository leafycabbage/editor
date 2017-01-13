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

import _ from 'lodash';
import React from 'react';
import {Entity} from 'draft-js';

import BlockItem from './BlockItem.js';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';

import {WidthProvider, Responsive} from 'react-grid-layout';

var ResponsiveReactGridLayout = WidthProvider(Responsive);

class Block extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,

            items: [{
                i: "Initial",
                x: 0,
                y: 0,
                w: 12,
                h: 5
            }],

            newCounter: 0
        };

        this._onClick = () => {
            if (this.state.editMode) {
                return;
            }

            this.setState({
                editMode: true
            }, () => {
                this._startEdit();
            });
        };

        this._onLayoutChange = items => {
            this.setState({
                items: items
            })
        }

        this._onAddItem = () => {
            this.setState({
                // Add a new item. It must have a unique key!
                items: this.state.items.concat({
                    i: 'n' + this.state.newCounter,
                    x: 0,
                    y: Infinity,
                    w: 12,
                    h: 5
                }),
                // Increment the counter to ensure key is always unique.
                newCounter: this.state.newCounter + 1
            });
        },

        this._save = () => {

            if (this.props.block) {
                var entityKey = this.props.block.getEntityAt(0);
                Entity.mergeData(entityKey, {components: this.state.components});
            }
            
            this.setState({
                editMode: false,
            }, this._finishEdit);
        };

        this._remove = () => {
            this.props.blockProps.onRemove(this.props.block.getKey());
        };
        this._startEdit = () => {
            this.props.blockProps.onStartEdit(this.props.block.getKey());
        };
        this._finishEdit = () => {
            this.props.blockProps.onFinishEdit(this.props.block.getKey());
        };
    }

    render() {
        var className = 'block-editor';
        if (this.state.editMode) {
            className += ' block-editor-active';
        }

        var output = null;
        var editPanel = null;

        var items = this.state.items.map(function(item) {
            return (
                <BlockItem key={item.i} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h}}>
                    {item.i}
                </BlockItem>
            )
        })

        if (this.state.editMode) {
            editPanel =
                <div className="block-editor-panel">
                    <ResponsiveReactGridLayout onLayoutChange={this._onLayoutChange} onBreakpointChange={this._onBreakpointChange} {...this.props}>
                        {items}
                    </ResponsiveReactGridLayout>

                    <div className="block-editor-buttons">
                        <FloatingActionButton onClick={this._onAddItem}>
                            <ContentAdd />
                        </FloatingActionButton>

                        <FloatingActionButton onClick={this._save}>
                            <ContentSave />
                        </FloatingActionButton>
                    </div>
                </div>;
        } else {
            output =
                <div onClick={this._onClick}>
                    <ResponsiveReactGridLayout {...this.props} isDraggable={false} isResizable={false}>
                        {items}
                    </ResponsiveReactGridLayout>
                </div>
        }

        return (
            <div className={className}>
                {output}
                {editPanel}
            </div>
        );
  }
}

Block.defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 10
}

export default Block;
