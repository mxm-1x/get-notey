"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import PdfViewer from '../_components/PdfViewer'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Texteditor from '@/app/dashboard/_components/Texteditor'
import { Sparkles } from 'lucide-react'

const Workspace = () => {
    const { fileId } = useParams()
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
    })
    const [showTip, setShowTip] = useState(true);

    useEffect(() => {
        console.log(fileInfo)
    }, [fileInfo])

    return (
        <div className="bg-[#121212] min-h-screen">
            <WorkspaceHeader />
            {showTip && (
                <div className="bg-gradient-to-r from-[#1e1e1e] to-[#121212] backdrop-blur-sm border border-[#51cb20]/30 text-white p-3 mx-4 mt-2 rounded-lg flex justify-between items-center shadow-lg shadow-[#51cb20]/5 animate-fadeIn">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#51cb20]/20 p-2 rounded-full">
                            <Sparkles className="h-5 w-5 text-[#51cb20]" />
                        </div>
                        <div>
                            <span className="text-[#51cb20] font-medium block text-sm">AI Assistant</span>
                            <span className="text-gray-300">Select the text and click on "Ask AI" to get intelligent insights</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowTip(false)}
                        className="bg-[#1e1e1e] hover:bg-[#2a2a2a] text-gray-400 hover:text-white p-1.5 rounded-full transition-colors"
                    >
                        ×
                    </button>
                </div>
            )}
            <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] p-2 md:p-4 gap-4">
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
                    {/* text editor */}
                    <Texteditor fileId={fileId}/>
                </div>
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
                    {/* pdf viewer */}
                    {fileInfo && fileInfo[0]?.fileUrl ? (
                        <PdfViewer fileUrl={fileInfo[0].fileUrl} />
                    ) : (
                        <div className="flex items-center justify-center h-full border border-dashed border-[#333] rounded-lg p-4 bg-[#1e1e1e]">
                            <p className="text-muted-foreground">Loading PDF...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Add this CSS to your global.css file or a component style
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.3s ease-out forwards;
// }

export default Workspace