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
import {Entity} from 'draft-js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import BlockEditor from './BlockEditor.js';

class HTMLOutput extends React.Component {
    constructor(props) {
        super(props);
        this._timer = null;
    }

    _update() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
    }

    componentDidMount() {
        this._update();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.content !== this.props.content) {
            this._update();
        }
    }

    componentWillUnmount() {
        clearTimeout(this._timer);
        this._timer = null;
    }

    render() {
        return (
            <div ref="container" style={this.props.style} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}

export default class Block extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,

            selectMode: false,
            selectionRowStart: 0,
            selectionRowEnd: 0,
            selectionColStart: 0,
            selectionColEnd: 0,
            selectedMode: false
        };

        this._onClick = () => {
            if (this.state.editMode) {
                return;
            }

            this.setState({
                editMode: true,
                rows: this._getRows(),
                cols: this._getCols()
            }, () => {
                this._startEdit();
            });
        };

        /* Handle Selection of the Block Grid */
        this._onSelectionRemove = evt => {
            this.setState({
                selectMode: false,
                selectedMode: false,
                selectionRowStart: 0,
                selectionRowEnd: 0,
                selectionColStart: 0,
                selectionColEnd: 0
            })
        }

        this._onSelectionStart = evt => {

            var coordinates = evt.target.id.split('/')

            this.setState({
                selectMode: true,
                selectionRowStart: coordinates[0],
                selectionRowEnd: coordinates[0],
                selectionColStart: coordinates[1],
                selectionColEnd: coordinates[1]
            })
        }

        this._onSelectionMove = evt => {

            if (!this.state.selectMode) {
                return
            }

            var coordinates = evt.target.id.split('/')

            this.setState({
                selectionRowStart: Math.min(this.state.selectionRowStart, coordinates[0]),
                selectionRowEnd: Math.max(this.state.selectionRowStart, coordinates[0]),
                selectionColStart: Math.min(this.state.selectionColStart, coordinates[1]),
                selectionColEnd: Math.max(this.state.selectionColStart, coordinates[1])
            })
        }

        this._onSelectionStop = evt => {

            var coordinates = evt.target.id.split('/')

            this.setState({
                selectMode: false,
                selectedMode: true,
                selectionRowStart: Math.min(this.state.selectionRowStart, coordinates[0]),
                selectionRowEnd: Math.max(this.state.selectionRowStart, coordinates[0]),
                selectionColStart: Math.min(this.state.selectionColStart, coordinates[1]),
                selectionColEnd: Math.max(this.state.selectionColStart, coordinates[1])
            })
        }

        this._onValueChange = evt => {
            var value = evt.target.value;
            var invalid = false;
            try {
                katex.__parse(value);
            } catch (e) {
                invalid = true;
            } finally {
                this.setState({
                    invalidTeX: invalid,
                    texValue: value,
                });
            }
        };

        this._save = () => {
            var entityKey = this.props.block.getEntityAt(0);
            Entity.mergeData(entityKey, {content: this.state.texValue});
            this.setState({
                invalidTeX: false,
                editMode: false,
                texValue: null,
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

    _getRows() {
        console.log("Entity ", this.props.block)
        return Entity
            .get(this.props.block.getEntityAt(0))
            .getData()['rows'];
    }

    _getCols() {
        return Entity
            .get(this.props.block.getEntityAt(0))
            .getData()['cols']
    }

    render() {
        var className = 'block-editor';
        if (this.state.editMode) {
            className += ' block-editor-active';
        }

        var output = null;
        var editPanel = null;
        var divStyle = null;

        if (this.state.editMode) {
            editPanel =
                <div className="block-editor-panel">
                    <div className="grid" onBlur={this._onSelectionRemove} onMouseDown={this._onSelectionStart} onMouseMove={this._onSelectionMove} onMouseUp={this._onSelectionStop}>
                        {this.state.rows.map(function(row, rowIdx) {
                            return this.state.cols.map(function(col, colIdx) {
                                var map = (rowIdx + 1) + "/" + (colIdx + 1) + "/" + (rowIdx + 2) + "/" + (colIdx + 2);
                                var isSelected =
                                    (rowIdx + 1) >= this.state.selectionRowStart &&
                                    (rowIdx + 1) <= this.state.selectionRowEnd &&
                                    (colIdx + 1) >= this.state.selectionColStart &&
                                    (colIdx + 1) <= this.state.selectionColEnd

                                var style = {
                                    minWidth: "50px",
                                    minHeight: "50px",
                                    gridArea: map,
                                    backgroundColor: isSelected ? "#cccccc" : "#ffffff"
                                };

                                return (<div id={map} key={map} style={style}></div>);
                            }.bind(this))
                        }.bind(this))}
                    </div>

                    <div className="block-editor-buttons">
                        <FloatingActionButton disabled={!this.state.selectedMode} onClick={this._add}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>;

            divStyle = {
                backgroundColor: "#cccccc",
                opacity: 0.8
            }
        } else {
            output =
                <HTMLOutput onClick={this._onClick}>
                    {this.props.block.getText()}
                </HTMLOutput>
        }

        return (
            <div className={className}>
                {output}
                {editPanel}
            </div>
        );
  }
}
