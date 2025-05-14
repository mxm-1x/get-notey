"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import PdfViewer from '../_components/PdfViewer'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Texteditor from '@/app/dashboard/_components/Texteditor'

const Workspace = () => {
    const { fileId } = useParams()
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
    })

    useEffect(() => {
        console.log(fileInfo)
    }, [fileInfo])

    return (
        <div>
            <WorkspaceHeader />
            <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)]">
                <div className="w-full md:w-1/2 p-2 md:p-4 h-1/2 md:h-full">
                    {/* text editor */}
                    <Texteditor fileId={fileId}/>
                </div>
                <div className="w-full md:w-1/2 p-2 md:p-4 h-1/2 md:h-full">
                    {/* pdf viewer */}
                    {fileInfo && fileInfo[0]?.fileUrl ? (
                        <PdfViewer fileUrl={fileInfo[0].fileUrl} />
                    ) : (
                        <div className="flex items-center justify-center h-full border border-dashed rounded-lg p-4">
                            <p className="text-muted-foreground">Loading PDF...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Workspace