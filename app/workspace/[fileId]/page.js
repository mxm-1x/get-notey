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
            <div className="flex flex-row h-[calc(100vh-5rem)]">
                <div className="w-1/2 p-4">
                    {/* text editor */}
                    <Texteditor/>
                </div>
                <div className="w-1/2 p-4">
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