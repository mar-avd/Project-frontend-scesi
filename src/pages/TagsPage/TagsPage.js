import { useEffect, useState } from "react"
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';

export default function TagsPage() {
    const [tags, setTags] = useState([]);
    const [nameTag, setNameTag] = useState("");
    const [editTag, setEditNameTag] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };
        api.get('tag', config).then((response) => {
            setTags(response.data)
        }).catch((error) => console.log(error))
    }, []);

    const user = AuthService.getCurrentUser();
    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    const addTag = () => {
        api.post('tag', { nameTag: nameTag }, config)
            .then((response) => {
                console.log(response);
                setNameTag("");
                // window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const editNameTag = (tagID) => {
        api.patch(`tag?tagID=${tagID}`, { nameTag: nameTag }, config)
            .then((response) => {
                console.log(response);
                setEditNameTag("");
                // window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const deleteTag = async (tagID) => {
        api.delete('tag?tagID=' + tagID, config).then(() => {
            // window.location.reload()
        }).catch((error) => console.log(error))
    }

    // RENDER
    return (
        <div className="py-3">
            <h3>Mis Etiquetas</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Editar etiqueta</th>
                        <th scope="col">Eliminar etiqueta</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{tag.nameTag}</td>
                                <td>
                                    <form onSubmit={(e) => { e.preventDefault(); editNameTag(tag.tagID) }}>
                                        {/* <input type="text" className="form-control" placeholder="Nombre de etiqueta"
                                            required onChange={(e) => setEditNameTag(e.target.value)} /> */}
                                        <button type="submit">Editar etiqueta</button>
                                    </form>
                                </td>
                                <td><button type="submit" onClick={(e) => (deleteTag(tag.tagID))}>Eliminar</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form onSubmit={(e) => { e.preventDefault(); addTag() }}>
                <input type="text" className="form-control" placeholder="Nombre de etiqueta"
                    required onChange={(e) => setNameTag(e.target.value)} value={nameTag} />
                <button type="submit">Agregar etiqueta</button>
            </form>

        </div >
    )
}

// PROBANDO DOCUMENTACIÓN INICIAL DE DRAFT.JS
/* import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

export default function MyEditor() {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }

    return (
        <div
            style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
            onClick={focusEditor}
        >
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write something!"
            />
        </div>
    );
} */


// PROBANDO CÓDIGO DE UN VIDEO
/* import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import '../pruebasEditorText/RichEditor.css'

export default class RichEditorExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 ) { //TAB 
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, // maxDepth 
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const { editorState } = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
}; */