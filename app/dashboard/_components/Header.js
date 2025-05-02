"use client"
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-30">
      <div className="flex h-16 items-center px-6">
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        
        {/* Search Bar */}
        <div className="flex-1 flex items-center justify-center max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search documents..." 
              className="w-full pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        {/* User Profile */}
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default Header