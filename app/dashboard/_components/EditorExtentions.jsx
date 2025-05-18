import { chatSession } from '@/configs/AIModel'
import { api } from '@/convex/_generated/api'
import { query } from '@/convex/_generated/server'
import { useAction } from 'convex/react'
import { Bold, Italic, Underline, Strikethrough, Code, List, ListOrdered, Quote, Undo2, Redo2, Heading1, Heading2, Heading3, Sparkle, SparkleIcon, Loader2, ChevronDown, Download } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'

function EditorExtentions({ editor }) {
    const { fileId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [aiMode, setAiMode] = useState('formalMode')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const downloadDropdownRef = useRef(null)

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
            if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target)) {
                setDownloadDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const PROMPTS = {
        genzMode: (selectedText, AllUnformattedAns) => `You're a Gen Z AI with a chill, fun vibe. Based on this question: '${selectedText}', and using this info: '${AllUnformattedAns}', write a relatable and engaging answer (up to 100 words or less if it fits, the answer can also be one liners or one words). Start with a catchy one-line title, then write in a casual tone using Gen Z slang, emojis (where relevant), and relaxed sentence structure. Keep it plain text only — no HTML, markdown, or code formatting.`,

        bestieMode: (selectedText, AllUnformattedAns) => `Hey bestie 💖 So here's the sitch — based on this question: '${selectedText}' and all this info: '${AllUnformattedAns}', give the cutest, smartest answer ever like you're talking to your BFF 😚✨ Keep it around 150 words, short or long, whatever feels right, the answer can also be one liners or one words. Start with a fun lil title, then explain things in a sweet, supportive way. Feel free to add hearts, sparkle emojis, and uplifting vibes 💅 Just keep it plain text — no HTML, code, or markdown, babe!`,

        formalMode: (selectedText, AllUnformattedAns) => `You're a professional AI assistant. Based on the following question: '${selectedText}' and using this information: '${AllUnformattedAns}', provide a clear, concise, and informative answer in around 150 words (or shorter if appropriate, the answer can also be one liners or one words). Begin with a formal, topic-appropriate title. Structure the response in clean paragraphs using formal language. Output must be in plain text only — do not use HTML tags, markdown, or code formatting.`
    };

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
            setIsLoading(true)
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
                setIsLoading(false)
                return
            }

            // Use the selected prompt mode
            const PROMPT = PROMPTS[aiMode](selectedText, AllUnformattedAns);

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
        } finally {
            setIsLoading(false)
        }
    }

    // Get display name for the current AI mode
    const getAiModeDisplayName = () => {
        switch (aiMode) {
            case 'genzMode': return 'Gen Z';
            case 'bestieMode': return 'Bestie';
            case 'formalMode': return 'Formal';
            default: return 'Formal';
        }
    }

    // Function to handle document download as DOC
    const handleDocDownload = async () => {
        if (!editor) return;
        
        try {
            setIsDownloading(true);
            
            // Get the editor content as HTML
            const editorContent = editor.getHTML();
            
            // Create a Blob with the content in MS Word compatible format
            // Using MS Word HTML format with specific meta tags
            const blob = new Blob([`
                <html xmlns:o="urn:schemas-microsoft-com:office:office" 
                      xmlns:w="urn:schemas-microsoft-com:office:word" 
                      xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="ProgId" content="Word.Document">
                    <meta name="Generator" content="Microsoft Word 15">
                    <meta name="Originator" content="Microsoft Word 15">
                    <title>Get Notey Document</title>
                    <style>
                        body { font-family: 'Calibri', sans-serif; line-height: 1.6; color: #333; }
                        h1 { color: #51cb20; }
                        h2, h3 { margin-top: 20px; }
                        blockquote { border-left: 3px solid #51cb20; padding-left: 10px; margin-left: 0; color: #555; }
                        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                        @page { size: 21.59cm 27.94cm; margin: 2cm; }
                    </style>
                </head>
                <body>
                    ${editorContent}
                </body>
                </html>
            `], { type: 'application/msword' });
            
            // Create a download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            // Get the document title from the first heading or use default
            let title = 'Get-Notey-Document';
            const firstHeading = editor.getJSON().content?.find(node => 
                node.type === 'heading' && node.content && node.content[0]?.text
            );
            
            if (firstHeading?.content[0]?.text) {
                title = firstHeading.content[0].text.substring(0, 30).replace(/[^a-z0-9]/gi, '-');
            }
            
            link.href = url;
            link.download = `${title}.doc`;
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Error generating document:', error);
        } finally {
            setIsDownloading(false);
            setDownloadDropdownOpen(false);
        }
    };

    // Function to handle document download as PDF
    const handlePdfDownload = async () => {
        if (!editor) return;
        
        try {
            setIsDownloading(true);
            
            // Get the editor content as HTML
            const editorContent = editor.getHTML();
            
            // Create a Blob with the content
            const blob = new Blob([`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Get Notey Document</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        h1 { color: #51cb20; }
                        h2, h3 { margin-top: 20px; }
                        blockquote { border-left: 3px solid #51cb20; padding-left: 10px; margin-left: 0; color: #555; }
                        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                    </style>
                </head>
                <body>
                    ${editorContent}
                </body>
                </html>
            `], { type: 'text/html' });
            
            // Create a download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            // Get the document title from the first heading or use default
            let title = 'Get-Notey-Document';
            const firstHeading = editor.getJSON().content?.find(node => 
                node.type === 'heading' && node.content && node.content[0]?.text
            );
            
            if (firstHeading?.content[0]?.text) {
                title = firstHeading.content[0].text.substring(0, 30).replace(/[^a-z0-9]/gi, '-');
            }
            
            link.href = url;
            link.download = `${title}.pdf`;
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsDownloading(false);
            setDownloadDropdownOpen(false);
        }
    };

    return editor && (
        <div className="bg-[#1e1e1e] rounded-lg p-3 mb-3 flex flex-wrap items-center gap-1 shadow-sm border border-[#333]">
            {/* Group 1: Headings */}
            <div className="flex items-center mr-2 border-r border-[#444] pr-2">
                <button
                    onClick={() => {
                        const { from, to } = editor.state.selection;
                        if (from !== to) {
                            // Text is selected
                            if (editor.isActive('heading', { level: 1 })) {
                                // If already a heading, convert to normal text
                                editor.chain().focus().setTextSelection({ from, to }).setParagraph().run();
                            } else {
                                // Apply heading only to selected text
                                editor.chain().focus().setTextSelection({ from, to }).setHeading({ level: 1 }).run();
                            }
                        } else {
                            // No selection, do nothing or show a message
                            console.log('Please select text to apply heading');
                        }
                    }}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('heading', { level: 1 })
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => {
                        const { from, to } = editor.state.selection;
                        if (from !== to) {
                            // Text is selected
                            if (editor.isActive('heading', { level: 2 })) {
                                // If already a heading, convert to normal text
                                editor.chain().focus().setTextSelection({ from, to }).setParagraph().run();
                            } else {
                                // Apply heading only to selected text
                                editor.chain().focus().setTextSelection({ from, to }).setHeading({ level: 2 }).run();
                            }
                        } else {
                            // No selection, do nothing or show a message
                            console.log('Please select text to apply heading');
                        }
                    }}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('heading', { level: 2 })
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => {
                        const { from, to } = editor.state.selection;
                        if (from !== to) {
                            // Text is selected
                            if (editor.isActive('heading', { level: 3 })) {
                                // If already a heading, convert to normal text
                                editor.chain().focus().setTextSelection({ from, to }).setParagraph().run();
                            } else {
                                // Apply heading only to selected text
                                editor.chain().focus().setTextSelection({ from, to }).setHeading({ level: 3 }).run();
                            }
                        } else {
                            // No selection, do nothing or show a message
                            console.log('Please select text to apply heading');
                        }
                    }}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('heading', { level: 3 })
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </button>
            </div>

            {/* Group 2: Text Formatting */}
            <div className="flex items-center mr-2 border-r border-[#444] pr-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('bold')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('italic')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('underline')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Underline"
                >
                    <Underline className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('strike')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Strikethrough"
                >
                    <Strikethrough className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('code')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Code"
                >
                    <Code className="w-4 h-4" />
                </button>
            </div>

            {/* Group 3: Lists and Quotes */}
            <div className="flex items-center mr-2 border-r border-[#444] pr-2">
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('bulletList')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('orderedList')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Ordered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-1.5 rounded-md transition-colors ${editor.isActive('blockquote')
                        ? 'bg-[#51cb20] text-black'
                        : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                    title="Blockquote"
                >
                    <Quote className="w-4 h-4" />
                </button>
            </div>

            {/* Group 4: History and Download */}
            <div className="flex items-center">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-1.5 rounded-md transition-colors bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]"
                    title="Undo"
                >
                    <Undo2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-1.5 rounded-md transition-colors bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]"
                    title="Redo"
                >
                    <Redo2 className="w-4 h-4" />
                </button>
                
                {/* Download dropdown */}
                <div className="relative" ref={downloadDropdownRef}>
                    <button
                        onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                        disabled={isDownloading}
                        className={`p-1.5 rounded-md transition-colors ${
                            isDownloading 
                                ? 'bg-[#333] cursor-not-allowed' 
                                : 'bg-transparent text-white hover:bg-[#222] hover:text-[#51cb20]'
                        }`}
                        title="Download Document"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    
                    {downloadDropdownOpen && (
                        <div className="absolute left-0 mt-1 w-36 bg-[#333] rounded-md shadow-lg z-10 border border-[#444]">
                            <button
                                onClick={handleDocDownload}
                                disabled={isDownloading}
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] rounded-t-md flex items-center gap-2"
                            >
                                <span className="text-sm">Word (.doc)</span>
                            </button>
                            <button
                                onClick={handlePdfDownload}
                                disabled={isDownloading}
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] rounded-b-md flex items-center gap-2"
                            >
                                <span className="text-sm">PDF (.pdf)</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Controls */}
            <div className="ml-auto flex items-center gap-2">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="px-3 py-1.5 rounded-md transition-colors bg-[#333] text-white hover:bg-[#444] flex items-center gap-1"
                        title="AI Response Style"
                    >
                        <span className="text-sm">{getAiModeDisplayName()}</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-1 w-36 bg-[#333] rounded-md shadow-lg z-10 border border-[#444]">
                            <button
                                onClick={() => {
                                    setAiMode('formalMode');
                                    setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] rounded-t-md ${aiMode === 'formalMode' ? 'bg-[#444]' : ''}`}
                            >
                                Formal
                            </button>
                            <button
                                onClick={() => {
                                    setAiMode('genzMode');
                                    setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] ${aiMode === 'genzMode' ? 'bg-[#444]' : ''}`}
                            >
                                Gen Z
                            </button>
                            <button
                                onClick={() => {
                                    setAiMode('bestieMode');
                                    setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] rounded-b-md ${aiMode === 'bestieMode' ? 'bg-[#444]' : ''}`}
                            >
                                Bestie
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={onAiClick}
                    disabled={isLoading}
                    className={`px-3 py-1.5 rounded-md transition-colors ${isLoading ? 'bg-[#3a8a15] cursor-not-allowed' : 'bg-[#51cb20] hover:bg-[#45b01c]'} flex items-center gap-2`}
                    title="AI Assist"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                            <span className="text-sm font-medium text-white">Generating...</span>
                        </>
                    ) : (
                        <>
                            <SparkleIcon className="text-white w-4 h-4" />
                            <span className="text-sm font-medium text-white">Ask AI</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default EditorExtentions