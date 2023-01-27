import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../EditNoteModal/prueba/RichEditor.css'
import AuthService from '../../config/auth.service';
import { api } from "../../config/site.config";


export default class AddEditorText extends React.Component {
    constructor(props) {
        super(props);

        this.content = "";
        this.state = { editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.content))) };
        this.titleNote = this.props;

        this.focus = React.createRef();
        this.onChange = (editorState) => this.setState({ editorState });

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            console.log('Shorcut', newState); // Cuando usamos un shortcut

            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {

        if (e.keyCode === 9) { //TAB
            console.log('TAB', e); //Cuando pulso el TAB
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

        console.log('Blocktype', blockType); // Usamos los H1, H2, etc
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        console.log(inlineStyle) //Los estilos de texto
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    // Para convertir html a cadena
    getConversion(editorState) {

        const user = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        const conversionHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        let conversionString = "";
        convertToRaw(editorState.getCurrentContent())
            .blocks.forEach(element => {
                conversionString += " " + element.text;
            });
// Para guardar contenidos de la nota 
        api.post('note', {titleNote: this.props.titleNote, contentNote: conversionString, contentHTMLNote: conversionHTML }, config)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    render() {
        const { editorState } = this.state;

        // Si el usuario cambia el tipo de bloque antes de introducir cualquier texto, podemos aplicar estilo 
        // al marcador de posición u ocultarlo. Vamos a ocultarlo ahora.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) { //Verificamos si hay contenido
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                <div>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div className={className} /* onClick={this.focus} */>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            keyBindingFn={this.mapKeyToEditorCommand}
                            onChange={this.onChange}
                            placeholder ="Escribe tu nota aqui..."
                            ref={this.focus}
                            spellCheck={true}
                        />
                    </div>
                </div>
                <div className='py-3 text-end'>
                    <button className='btn btn-primary' onClick={() => { this.getConversion(editorState) }}>Agregar</button>
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
};