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
import { connect } from 'react-redux';
import { WidthProvider, Responsive } from 'react-grid-layout';
import PureComponent from './PureComponent';
import Block from './Block';
import * as actions from '../actions'

var ResponsiveReactGridLayout = WidthProvider(Responsive);

class LayoutBlock extends PureComponent {

    handleSelectClick = e => {
        e.preventDefault()
        e.stopPropagation()

        const { select, id } = this.props

        console.log('selecting this layout ', id)
        select("LAYOUT", id)
    }

    handleAddChildClick = e => {
        e.preventDefault()

        const { addChild, createLayout, createBlock, id } = this.props
        const layoutId = createLayout({
            x: 0,
            y: 0,
            w: 12,
            h: 2
        }).layoutId

        const childId = createBlock().blockId

        addChild(id, childId , layoutId)
    }

    handleRemoveClick = e => {
        e.preventDefault()

        const { removeChild, deleteBlock, parentId, id } = this.props
        removeChild(parentId, id)
        deleteBlock(id)
    }

    handleLayoutChange = (layout, layouts) => {
        if (layout.length === 0) return;

        //const { changeLayout, id } = this.props

        //changeLayout(id, layout)
    }

    renderChild = layout => {
        const {id} = this.props

        return (
            <div key={layout.i}>
                <Block id={layout.i} parentId={id} />
            </div>
        )
    }

    render() {
        const { id, selected, layouts } = this.props

        const style = {
            width: "100%",
            height: "100%"
        }

        let safeLayouts = {
            lg: [],
            ...layouts
        }

        return (
            <div onClick={this.handleSelectClick} style={style}>
                <ResponsiveReactGridLayout
                    layouts={safeLayouts}
                    onLayoutChange={this.handleLayoutChange}
                    isResizable={selected}
                    isDraggable={selected}
                >
                    {safeLayouts.lg.map(this.renderChild)}
                </ResponsiveReactGridLayout>

                <a href="#" onClick={this.handleAddChildClick}>
                  Add Child
                </a>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { editor, layouts } = state
    const { type, id } = editor.selected

    return  {
        selected: type === "LAYOUT" && id === ownProps.id,
        layouts: layouts[ownProps.id]
    }
}

const ConnectedBlock = connect(mapStateToProps, actions)(LayoutBlock)
export default ConnectedBlock
