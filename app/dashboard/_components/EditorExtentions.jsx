import { chatSession } from '@/configs/AIModel'
import { api } from '@/convex/_generated/api'
import { query } from '@/convex/_generated/server'
import { useAction } from 'convex/react'
import { Bold, Italic, Underline, Strikethrough, Code, List, ListOrdered, Quote, Undo2, Redo2, Heading1, Heading2, Heading3, Sparkle, SparkleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

function EditorExtentions({ editor }) {
    const { fileId } = useParams()

    const searchAi = useAction(api.myAction.search)
    const onAiClick = async () => {
        console.log('ai clicked')

        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to
        )
        
        if (!selectedText || selectedText.trim() === '') {
            console.log('No text selected. Please select some text to search.')
            return
        }
        
        console.log(selectedText)
    
        try {
            const result = await searchAi(
                {
                    query: selectedText,
                    fileId: fileId
                }
            )
    
            const UnformattedAns = JSON.parse(result)
            let AllUnformattedAns = ''
            
            UnformattedAns && UnformattedAns.forEach((item) => {
                AllUnformattedAns += item.pageContent
            });
    
            if (!AllUnformattedAns) {
                console.log('No relevant information found in the document.')
                return
            }
    
            // Change the prompt to ask for a formatted answer, not HTML code
            const PROMPT = "Based on the following question: '" + selectedText +
                "' and using this information: '" + AllUnformattedAns +
                "', provide a comprehensive answer in around 150 words (it can also be a short answer accordingly). Format your response as plain text with a clear title on the first line, followed by your answer in paragraphs. Do not include any HTML tags, code blocks, or markdown formatting.";
    
            const AiModelResult = await chatSession.sendMessage(PROMPT);
            // Get the text content from the response
            const aiResponse = await AiModelResult.response.text();
            console.log("AI response:", aiResponse);
    
            // Store the current cursor position
            const { from, to } = editor.state.selection
    
            // Move cursor to the end of the selection
            editor.chain().focus().setTextSelection(to).run()
    
            // Insert a line break first
            editor.chain().focus().insertContent('\n\n').run();
    
            // Split the response into lines
            const lines = aiResponse.split('\n').filter(line => line.trim() !== '');
    
            // Create a new node for the AI response
            if (lines.length > 0) {
                // Insert the first line as a heading (title)
                editor.chain().focus().setNode('heading', { level: 2 }).insertContent(lines[0]).run();
                editor.chain().focus().insertContent('\n').run();
                
                // Insert the rest as paragraphs
                if (lines.length > 1) {
                    for (let i = 1; i < lines.length; i++) {
                        editor.chain().focus().setNode('paragraph').insertContent(lines[i]).run();
                        if (i < lines.length - 1) {
                            editor.chain().focus().insertContent('\n').run();
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error getting AI response:', error)
        }
    }
    return editor && (
        <div className="bg-[#1e1e1e] rounded-lg p-2 mb-3 flex flex-wrap items-center gap-2 shadow-sm border border-[#333]">
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 1 })
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Heading 1"
            >
                <Heading1 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 2 })
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Heading 2"
            >
                <Heading2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 3 })
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Heading 3"
            >
                <Heading3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('bold')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Bold"
            >
                <Bold className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('italic')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Italic"
            >
                <Italic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('underline')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Underline"
            >
                <Underline className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('strike')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Strikethrough"
            >
                <Strikethrough className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('code')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Code"
            >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('bulletList')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Bullet List"
            >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('orderedList')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Ordered List"
            >
                <ListOrdered className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-1 sm:p-2 rounded-md transition-colors ${editor.isActive('blockquote')
                    ? 'bg-[#51cb20] text-black'
                    : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                    }`}
                title="Blockquote"
            >
                <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-1 sm:p-2 rounded-md transition-colors bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]"
                title="Undo"
            >
                <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-1 sm:p-2 rounded-md transition-colors bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]"
                title="Redo"
            >
                <Redo2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
                <button
                    onClick={onAiClick}
                    className="w-full sm:w-auto p-1 sm:p-2 rounded-md transition-colors bg-[#51cb20] text-black hover:bg-[#45b01c] flex items-center justify-center sm:justify-start gap-2"
                    title="AI Assist"
                >
                    <SparkleIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium text-white">Ask AI</span>
                </button>
            </div>
        </div>
    )
}

export default EditorExtentions