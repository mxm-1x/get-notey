import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WorkspaceHeader = ({fileName}) => {
    return (
        <header className="w-full border-b border-border bg-background shadow-sm sticky top-0 z-20">
            <div className="flex justify-between items-center flex-row px-6 py-3 h-20">
                <div className="flex items-center gap-3">
                    <Image
                        alt="logo"
                        src={require('../../../public/logo.png')}
                        width={48}
                        height={48}
                        className="rounded-md"
                        priority
                    />
                    <span className="text-2xl font-bold text-foreground tracking-tight">Get Notey</span>
                </div>
                <UserButton
                    appearance={{
                        baseTheme: "dark",
                        elements: {
                            userButtonAvatarBox: "h-10 w-10",
                            userButtonPopoverCard: "bg-[#1e1e1e] border border-[#333]",
                            userButtonPopoverFooter: "bg-[#1e1e1e]",
                            userButtonPopoverActions: "text-[#e0e0e0]",
                            userPreviewMainIdentifier: "text-[#e0e0e0]",
                            userPreviewSecondaryIdentifier: "text-[#888]",
                            userButtonPopoverActionButton: "text-[#e0e0e0] hover:bg-[#333]",
                            userButtonPopoverActionButtonIcon: "text-[#888]",
                            userButtonPopoverActionButtonText: "text-[#e0e0e0]"
                        }
                    }}
                />
            </div>
        </header>
    )
}

export default WorkspaceHeader