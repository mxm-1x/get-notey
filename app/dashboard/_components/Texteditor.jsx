import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import React from 'react'
import EditorExtentions from './EditorExtentions'

function Texteditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                listItem: false,
                blockquote: false,
            }),
            Underline,
            BulletList.configure({
                keepMarks: true,
                keepAttributes: false,
                HTMLAttributes: {
                    class: 'editor-bullet-list',
                },
            }),
            OrderedList.configure({
                keepMarks: true,
                keepAttributes: false,
                HTMLAttributes: {
                    class: 'editor-ordered-list',
                },
            }),
            ListItem.configure({
                HTMLAttributes: {
                    class: 'editor-list-item',
                },
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: 'border-l-4 border-[#51cb20] pl-4 italic',
                },
            }),
            Placeholder.configure({
                placeholder: `let's get notey.....`,
                emptyEditorClass: 'is-editor-empty',
                emptyNodeClass: 'is-empty',
                showOnlyWhenEditable: true,
                showOnlyCurrent: false,
            })
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[200px] p-3 prose prose-invert max-w-none',
            },
        },
    })

    return (
        <div>
            {editor && <EditorExtentions editor={editor} />}
            <div className='text-white bg-[#1e1e1e] rounded-lg p-2'>
                <style jsx global>{`
                    .ProseMirror h1 {
                        font-size: 1.8rem;
                        font-weight: bold;
                        margin: 1rem 0;
                        color: white;
                    }
                    .ProseMirror h2 {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 0.8rem 0;
                        color: white;
                    }
                    .ProseMirror h3 {
                        font-size: 1.2rem;
                        font-weight: bold;
                        margin: 0.6rem 0;
                        color: white;
                    }
                    .ProseMirror ul {
                        list-style-type: disc !important;
                        padding-left: 1.5rem !important;
                        margin: 1rem 0 !important;
                    }
                    .ProseMirror ol {
                        list-style-type: decimal !important;
                        padding-left: 1.5rem !important;
                        margin: 1rem 0 !important;
                    }
                    .ProseMirror li {
                        margin: 0.5rem 0 !important;
                        color: white !important;
                    }
                    .ProseMirror li p {
                        margin: 0 !important;
                    }
                    .ProseMirror blockquote {
                        border-left: 4px solid #51cb20 !important;
                        padding-left: 1rem !important;
                        font-style: italic !important;
                        margin: 1rem 0 !important;
                    }
                    .editor-bullet-list {
                        list-style-type: disc !important;
                        padding-left: 1.5rem !important;
                    }
                    .editor-ordered-list {
                        list-style-type: decimal !important;
                        padding-left: 1.5rem !important;
                    }
                    .editor-list-item {
                        margin: 0.5rem 0 !important;
                    }
                `}</style>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Texteditor