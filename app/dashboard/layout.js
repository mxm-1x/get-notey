"use client"
import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SideBar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout