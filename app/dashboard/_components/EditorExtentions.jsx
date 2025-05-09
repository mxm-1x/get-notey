import { Bold, Italic, Underline, Strikethrough, Code, List, ListOrdered, Quote, Undo2, Redo2, Heading1, Heading2, Heading3 } from 'lucide-react'
import React from 'react'

function EditorExtentions({ editor }) {
    return editor && (
        <div className="bg-[#1e1e1e] rounded-lg p-2 mb-3 flex items-center gap-2 shadow-sm border border-[#333]">
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('heading', { level: 1 })
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Heading 1"
            >
                <Heading1 />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('heading', { level: 2 })
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Heading 2"
            >
                <Heading2 />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('heading', { level: 3 })
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Heading 3"
            >
                <Heading3 />
            </button>
            
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('bold')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Bold"
            >
                <Bold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('italic')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Italic"
            >
                <Italic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('underline')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Underline"
            >
                <Underline />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('strike')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Strikethrough"
            >
                <Strikethrough />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('code')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Code"
            >
                <Code />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('bulletList')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Bullet List"
            >
                <List />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('orderedList')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Ordered List"
            >
                <ListOrdered />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded-md transition-colors ${
                    editor.isActive('blockquote')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                }`}
                title="Blockquote"
            >
                <Quote />
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded-md transition-colors bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]"
                title="Undo"
            >
                <Undo2 />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded-md transition-colors bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]"
                title="Redo"
            >
                <Redo2 />
            </button>
        </div>
    )
}

export default EditorExtentions