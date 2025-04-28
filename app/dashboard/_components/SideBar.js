import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Layout, Shield } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function SideBar() {
    return (
        <div className='m-1 bg-slate-100 rounded-4xl h-screen p-5 flex flex-col'>
            <div className='flex items-center justify-center mb-8'>
                <Image src={'/logo.png'} alt='logo' width={90} height={90} />
            </div>

            <div className='flex-1'>
                <Button className='w-full text-sm font-medium shadow-sm'>+ Upload PDF</Button>

                <div className='mt-8 space-y-1'>
                    <div className='flex items-center gap-2 p-2.5 hover:bg-slate-100 rounded-md cursor-pointer transition-colors text-sm font-medium text-gray-700' >
                        <Layout size={18} />
                        <h2>WorkSpace</h2>
                    </div>

                    <div className='flex items-center gap-2 p-2.5 hover:bg-slate-100 rounded-md cursor-pointer transition-colors text-sm font-medium text-gray-700' >
                        <Shield size={18} />
                        <h2>Full Access</h2>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 p-5'>
                <Progress value={33} />
                <p className='text-sm mt-2'>2 out of 5 Pdf Uploaded</p>
                <p className='text-xs text-muted-foreground'>Upgrad to get full access</p>
            </div>
        </div>
    )
}

export default SideBar