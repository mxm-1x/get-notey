"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';

function Dashboard() {
    const { user } = useUser();
    // if (!user) {
    //     redirect("/sign-in");
    // }
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
    });


    console.log(fileList)
    return (
        <div className="p-6 max-w-6xl mx-auto bg-[#121212]">
            <h2 className='font-medium text-3xl mb-6 text-white'>Your Workspace</h2>

            {!fileList || fileList.length === 0 ? (
                <div className="bg-[#1e1e1e] rounded-lg p-8 text-center border border-[#333]">
                    <p className="text-gray-300 mb-4">No files found in your workspace</p>
                    <p className="text-sm text-gray-400">Upload a file to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fileList.map((file) => (
                        <Link href={`/workspace/${file.fileId}`} key={file.fileId}>
                            <div className="bg-[#1e1e1e] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#333] hover:border-[#51cb20]">
                                <div className="p-5">
                                    <div className="flex items-center mb-3">
                                        <FileText className="h-5 w-5 text-[#51cb20] mr-2" />
                                        <h3 className="font-medium text-lg text-white truncate">{file.fileName}</h3>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-400 mt-4">
                                        <User className="h-4 w-4 mr-1" />
                                        <p className="truncate">{file.createdBy}</p>
                                        {/* <p>{(file._creationTime)}</p> */}
                                    </div>


                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
