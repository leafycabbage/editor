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

import React from 'react';
import {Component} from 'react';
import {WidthProvider, Responsive} from 'react-grid-layout';
import { connect } from 'react-redux'
import PureComponent from './PureComponent';
import * as actions from '../actions'

var ResponsiveReactGridLayout = WidthProvider(Responsive);

class BlockItem extends PureComponent {

    handleSelectClick = e => {
        e.preventDefault()
        e.stopPropagation()

        const { select, parentId } = this.props
        select(parentId)
    }

    handleAddChildClick = e => {
        e.preventDefault()

        const { addChild, createBlock, id } = this.props
        const childId = createBlock({
            x: 0,
            y: 0,
            w: 12,
            h: 2
        }).nodeId
        addChild(id, childId)
    }

    handleRemoveClick = e => {
        e.preventDefault()

        const { removeChild, deleteBlock, parentId, id } = this.props
        removeChild(parentId, id)
        deleteBlock(id)
    }

    handleLayoutChange(layout, layouts) {
        this.setState({layouts})
        this.props.handleLayoutChange(layout, layouts);
    }

    renderChild = i => {
        const {i} = this.props

        return (
            <div key={childId}>
                <ConnectedBlock id={childId} parentId={id} />
            </div>
        )
    }

    render() {
        const { id, selected, layouts, parentId, childIds } = this.props

        const style = {
            width: "100%",
            height: "100%"
        }
        console.log(layouts)
        return (
            <div onClick={this.handleSelectClick} style={style}>
                {id} - {selected ? "Is selected" : "Is not selected"}
                <ResponsiveReactGridLayout
                    layouts={layouts}
                    onLayoutChange={this.handleLayoutChange}
                    isResizable={selected}
                    isDraggable={selected}
                >
                    {layouts.lg.map(this.renderChild)}
                </ResponsiveReactGridLayout>

                <a href="#" onClick={this.handleAddChildClick}>
                  New Layout
                </a>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { editor, layout, layouts } = state

    console.log(state)
    return {
        selected: editor.selectedNode === ownProps.id,
        layout: layouts,
        ...layout[ownProps.id]
    }
}

const ConnectedBlock = connect(mapStateToProps, actions)(BlockItem)
export default ConnectedBlock
