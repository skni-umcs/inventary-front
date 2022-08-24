import {convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface DescriptionEditorProps {
    isEditing: boolean;
    editorState: EditorState;
    setEditorState: (editorState: EditorState) => void;
}

const options = {
    options: ['history', 'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', ],
    inline: {
        inDropdown: false,
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    },
    blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    },
    fontSize: {
        options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48],
    },
    fontFamily: {
        options: ['Roboto', 'Tahoma', 'Times New Roman', 'Verdana'],
    },
    list: {
        inDropdown: false,
        options: ['unordered', 'ordered', 'indent', 'outdent'],
    },
    textAlign: {
        inDropdown: false,
        options: ['left', 'center', 'right', 'justify'],
    },
    link: {
        inDropdown: false,
        options: ['link', 'unlink'],
    },
    history: {
        inDropdown: false,
        options: ['undo', 'redo'],
    },
};

const DescriptionEditor = (props: DescriptionEditorProps) => {

    return (
        <>
            {props.isEditing ? (
                <Editor
                    editorState={props.editorState}
                    onEditorStateChange={props.setEditorState}
                    toolbar={options}
                />
            ) : (
                <div
                    style={{
                        borderRight: '1px solid #ccc',
                        borderBottom: '1px solid #ccc',
                        borderLeft: '1px solid #eee',
                        borderTop: '1px solid #eee',
                        width: '100%',
                        minHeight: '120px',
                        padding: '2px',
                    }}
                    dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(props.editorState.getCurrentContent()))}}
                />
            )}
        </>
    );
};

export default DescriptionEditor;