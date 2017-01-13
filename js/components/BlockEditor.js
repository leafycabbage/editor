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

import Draft from 'draft-js';
import Immutable from 'immutable';
import {Map} from 'immutable';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Block from './Block';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {convertFromHTML} from '../utils/convertFromHTML';
import {extendedBlockRenderMap} from '../data/blockRenderMap';
import {insertBlock} from '../modifiers/insertBlock';
import {removeBlock} from '../modifiers/removeBlock';

var {Editor, EditorState, RichUtils} = Draft;

export default class BlockEditor extends React.Component {
    constructor(props) {
        super(props);

        var childrenInnerHTML = '';
        if (typeof props.children !== 'string') {
            childrenInnerHTML = ReactDOMServer.renderToStaticMarkup(props.children)
        } else {
            childrenInnerHTML = props.children
        }

        this.state = {
            editorState: EditorState.createWithContent(convertFromHTML(childrenInnerHTML)),
            liveTeXEdits: Map(),
        };

        this._blockRenderer = (block) => {
            if (block.getType() == 'block') {
                return {
                    component: Block,
                    editable: false,
                    props: {
                        children: block.getText(),
                        onStartEdit: (blockKey) => {
                            var {liveTeXEdits} = this.state;
                            this.setState({liveTeXEdits: liveTeXEdits.set(blockKey, true)});
                        },
                        onFinishEdit: (blockKey) => {
                            var {liveTeXEdits} = this.state;
                            this.setState({liveTeXEdits: liveTeXEdits.remove(blockKey)});
                        },
                        onRemove: (blockKey) => this._removeTeX(blockKey),
                    },
                };
            }
            return null;
        };

        this._focus = () => this.refs.editor.focus();
        this._onChange = (editorState) => this.setState({editorState});

        this._handleKeyCommand = command => {
            var {editorState} = this.state;
            var newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                this._onChange(newState);
                return true;
            }
            return false;
        };

        this._removeTeX = (blockKey) => {
            var {editorState, liveTeXEdits} = this.state;
            this.setState({
                liveTeXEdits: liveTeXEdits.remove(blockKey),
                editorState: removeBlock(editorState, blockKey),
            });
        };

        this._insertTeX = () => {
            this.setState({
                liveTeXEdits: Map(),
                editorState: insertBlock(this.state.editorState),
            });
        };
    }

    /**
    * While editing TeX, set the Draft editor to read-only. This allows us to
    * have a textarea within the DOM.
    */
    render() {
        return (
            <MuiThemeProvider>
                <div className="TexEditor-container">
                    <div className="TeXEditor-root">
                        <div className="TeXEditor-editor" >
                            <Editor
                                blockRenderMap={extendedBlockRenderMap}
                                blockRendererFn={this._blockRenderer}
                                editorState={this.state.editorState}
                                handleKeyCommand={this._handleKeyCommand}
                                onChange={this._onChange}
                                placeholder="Start a document..."
                                readOnly={this.state.liveTeXEdits.count()}
                                ref="editor"
                                spellCheck={true}
                            />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
    );
  }
}
