import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Layout, Shield, FileText, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadPdfDialog from './UploadPdfDialog'

function SideBar() {
    return (
        <div className='h-screen border-r border-border/30 bg-sidebar shadow-md flex flex-col'>
            {/* Logo Section */}
            <div className='p-5 flex items-center justify-center'>
                <Image src={'/logo.png'} alt='logo' width={32} height={32} className="mr-2" />
                <h1 className='font-semibold text-lg text-foreground'>Get Notey</h1>
            </div>
            
            {/* Main Navigation */}
            <div className='flex-1 px-4 py-6'>
                <UploadPdfDialog>
                    <Button className='w-full mb-8 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium shadow-sm rounded-md py-5'>
                        Upload PDF
                    </Button>
                </UploadPdfDialog>
                
                <div className='space-y-1 mb-6'>
                    <h3 className='text-xs uppercase text-muted-foreground/70 font-medium tracking-wider px-3 mb-2'>
                        Navigation
                    </h3>
                    <div className='flex items-center gap-3 p-3 hover:bg-primary/10 rounded-md cursor-pointer transition-colors text-sm font-medium text-foreground'>
                        <Layout size={18} className="text-primary" />
                        <h2>Dashboard</h2>
                    </div>
                    
                    <div className='flex items-center gap-3 p-3 hover:bg-primary/10 rounded-md cursor-pointer transition-colors text-sm font-medium text-foreground'>
                        <FileText size={18} className="text-primary" />
                        <h2>Documents</h2>
                    </div>
                    
                    <div className='flex items-center gap-3 p-3 hover:bg-primary/10 rounded-md cursor-pointer transition-colors text-sm font-medium text-foreground'>
                        <Shield size={18} className="text-primary" />
                        <h2>Access</h2>
                    </div>
                    
                    <div className='flex items-center gap-3 p-3 hover:bg-primary/10 rounded-md cursor-pointer transition-colors text-sm font-medium text-foreground'>
                        <Settings size={18} className="text-primary" />
                        <h2>Settings</h2>
                    </div>
                </div>
            </div>
            
            {/* Free PDF Upload Limit */}
            <div className='p-4 border-t border-border/30 mt-auto'>
                <div className='bg-card/30 rounded-lg p-4 shadow-sm'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm font-medium text-foreground'>Free Plan</span>
                        <span className='text-xs font-medium text-primary'>2/5 PDFs</span>
                    </div>
                    <Progress value={40} className="h-1.5 mb-2 bg-background" indicatorClassName="bg-primary" />
                    <p className='text-xs text-muted-foreground/80'>Upload 3 more PDFs for free</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar