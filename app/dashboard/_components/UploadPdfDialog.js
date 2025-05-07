"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2Icon, Upload } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import uuid4 from "uuid4";
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

function UploadPdfDialog({ children }) {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb)
    const getFileUrl = useMutation(api.fileStorage.getFileUrl)
    const embbedDocument = useAction(api.myAction.ingest)
    const { user } = useUser();
    const OnFileSelect = (event) => {
        setFile(event.target.files[0]);
    }

    const OnUpload = async () => {
        setLoading(true);


        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
        // Step 2: POST the file to the URL

        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        const { storageId } = await result.json();
        console.log("File uploaded successfully:", storageId);

        const fileId = uuid4();
        const fileUrl = await getFileUrl({ storageId: storageId })
        // Step 3: Save the newly allocated storage id to the database
        const res = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: fileName ?? 'Untitled File',
            fileUrl: fileUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        console.log(res)

        // api call to fetch PDF proccessed data
        const apiResponse = await axios.get('/api/pdfloader?pdfUrl=' + fileUrl)
        console.log(apiResponse.data.result)
        await embbedDocument({
            splitText: apiResponse.data.result,
            fileId: fileId
        });
        // console.log(embbedData)
        setLoading(false);
        setOpen(false);
    }

    return (
        <div className="flex justify-center">
            <Dialog open={open}>
                <DialogTrigger asChild>
                    <Button onClick={()=>{setOpen(true)}} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-48 px-10 py-1 mb-5 rounded-md flex items-center gap-2 shadow-sm transition-colors">
                        <Upload size={16} />
                        Upload PDF
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-background border-border">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-medium text-foreground">
                            <Upload size={20} className="text-primary" />
                            Upload PDF File
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground pt-1">
                            Add a new PDF document to your workspace
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="file-upload" className="text-sm font-medium text-foreground">
                                Select a PDF file
                            </label>
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-card">
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={(event) => OnFileSelect(event)}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                    <span className="text-sm font-medium text-foreground">
                                        {file ? file.name : 'Drag & drop your file here or click to browse'}
                                    </span>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        PDF files only (max 10MB)
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="file-name" className="text-sm font-medium text-foreground">
                                File Name <span className="text-primary">*</span>
                            </label>
                            <Input
                                id="file-name"
                                placeholder="Enter a name for your document"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="focus:ring-primary focus:border-primary bg-card text-foreground border-border"
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between border-t border-border pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="text-sm text-foreground border-border">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                            disabled={!file || !fileName}
                            onClick={OnUpload}
                        >
                            {loading ? <Loader2Icon className='animate-spin' /> : 'Upload'}

                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UploadPdfDialog