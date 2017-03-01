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
import {WidthProvider, Responsive} from 'react-grid-layout';
import { connect } from 'react-redux';
import PureComponent from './PureComponent';
import LayoutBlock from './LayoutBlock';
import ContentBlock from './ContentBlock';
import * as actions from '../actions'

var ResponsiveReactGridLayout = WidthProvider(Responsive);

class Block extends PureComponent {

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

    render() {
        const { id, selected, layoutId, contentId } = this.props

        const style = {
            width: "100%",
            height: "100%"
        }

        let contentBlock = null;
        if (typeof contentId !== "undefined") {
            contentBlock = <ContentBlock id={contentId} />
        }

        let layoutBlock = null;
        if (typeof layoutId !== "undefined") {
            layoutBlock = <LayoutBlock id={layoutId} />
        }

        return (
            <div style={style}>
                {contentBlock}
                {layoutBlock}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { editor, map } = state

    let current = map[ownProps.id]
    let contentId = current.contentId
    let layoutId = current.layoutId

    return  {
        selected: editor.selectedNode === ownProps.id,
        contentId: contentId,
        layoutId: layoutId
    }
}

const ConnectedBlock = connect(mapStateToProps, actions)(Block)
export default ConnectedBlock
