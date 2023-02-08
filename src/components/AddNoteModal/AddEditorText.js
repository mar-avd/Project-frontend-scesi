import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../assets/css/RichEditor.css'
import AuthService from '../../config/auth.service';
import { api } from "../../config/site.config";


export default class AddEditorText extends React.Component {
    constructor(props) {
        super(props);

        this.content = "";
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.content))),
            notificacionExceso: false,
            notificacionVacio: false,
        };
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

        if (e.keyCode === 9) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4,
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

    addNewNote(editorState) {

        const user = AuthService.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        };

        const conversionHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        let conversionString = '';
        convertToRaw(editorState.getCurrentContent())
            .blocks.forEach(element => {
                conversionString += element.text + ' ';
            });
        conversionString = conversionString.trim();
        // Para guardar contenidos de la nota
        if (this.props.titleNote !== '' || conversionString !== '') {
            if (conversionString.length <= 3000) {
                api.post('note', { titleNote: this.props.titleNote, contentNote: conversionString, contentHTMLNote: conversionHTML }, config)
                    .then((response) => {
                        window.location.reload();
                    })
                    .catch((error) => console.log(error));
            } else {
                this.state.notificacionExceso = true;
                setTimeout(() => { this.state.notificacionExceso = false }, 3500);
            }
        } else {
            this.state.notificacionVacio = true;
            setTimeout(() => { this.state.notificacionVacio = false }, 3500);
        }
    };

    render() {
        const { editorState, notificacionExceso, notificacionVacio } = this.state;

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
                    <BlockAndInlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <div className={className} /* onClick={this.focus} */>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            keyBindingFn={this.mapKeyToEditorCommand}
                            onChange={this.onChange}
                            placeholder="Escribe tu nota aquí ..."
                            ref={this.focus}
                            spellCheck={true}
                        />
                    </div>
                </div>
                <div className='py-3 text-end'>
                    <button className='btn btn-primary' onClick={() => { this.addNewNote(editorState) }}>Agregar</button>
                </div>
                {notificacionExceso
                    ? <div className='badge text-bg-danger d-flex justify-content-center' style={{ fontSize: '1rem' }}>Excediste los 3000 caracteres permitidos</div>
                    : null}
                {notificacionVacio
                    ? <div className='badge text-bg-danger d-flex justify-content-center' style={{ fontSize: '1rem' }}>No puedes crear una nota sin título o contenido</div>
                    : null}
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
                <i className={this.props.label}></i>
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'bi bi-fonts H1', style: 'header-one' },
    { label: 'bi bi-fonts H2', style: 'header-two' },
    { label: 'bi bi-fonts H3', style: 'header-three' },
    { label: 'bi bi-list-ul', style: 'unordered-list-item' },
    { label: 'bi bi-list-ol', style: 'ordered-list-item' },
];

var INLINE_STYLES = [
    { label: 'bi bi-type-bold', style: 'BOLD' },
    { label: 'bi bi-type-italic', style: 'ITALIC' },
    { label: 'bi bi-type-underline', style: 'UNDERLINE' },
];

const BlockAndInlineStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    const currentStyle = props.editorState.getCurrentInlineStyle();

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