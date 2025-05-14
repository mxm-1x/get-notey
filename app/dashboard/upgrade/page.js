"use client"
import React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function UpgradePlans() {
  const router = useRouter()
  const { user } = useUser();
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-3">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upgrade your plan to upload multiple PDFs and unlock advanced features to get more Notey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto px-4">
        {/* Free Plan */}
        <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-[#333] shadow-lg transform transition-transform hover:scale-105 duration-300">
          <div className="p-8 border-b border-[#333]">
            <h3 className="text-xl font-semibold text-white mb-2">Free Plan</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-bold text-white">$0</span>
              <span className="text-muted-foreground mb-1">/month</span>
            </div>
            <p className="text-sm text-gray-400">Perfect for getting started with basic features</p>
          </div>
          
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Upload up to 10 PDF files</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Basic note-taking features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Standard PDF viewer</span>
              </li>
              <li className="flex items-start gap-2">
                <X size={18} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500">Advanced AI features</span>
              </li>
              <li className="flex items-start gap-2">
                <X size={18} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500">Unlimited PDF uploads</span>
              </li>
              <li className="flex items-start gap-2">
                <X size={18} className="text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500">Priority support</span>
              </li>
            </ul>
          </div>
          
          <div className="p-8 pt-0">
            <Button 
              className="w-full bg-[#333] hover:bg-[#444] text-white rounded-xl py-6"
              onClick={() => router.push('/dashboard')}
            >
              Current Plan
            </Button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-[#51cb20] shadow-lg relative transform transition-transform hover:scale-105 duration-300">
          <div className="absolute top-0 right-0 bg-[#51cb20] text-white text-xs font-medium px-4 py-2 rounded-bl-xl">
            RECOMMENDED
          </div>
          
          <div className="p-8 border-b border-[#333]">
            <h3 className="text-xl font-semibold text-white mb-2">Pro Plan</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-bold text-white">$9.99</span>
              <span className="text-muted-foreground mb-1">/month</span>
            </div>
            <p className="text-sm text-gray-400">Unlock all features for serious productivity</p>
          </div>
          
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Unlimited PDF uploads</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Advanced note-taking features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Enhanced PDF viewer with annotations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">AI-powered insights and summaries</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Cloud sync across all devices</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-[#51cb20] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Priority email support</span>
              </li>
            </ul>
          </div>
          
          <div className="p-8 pt-0">
            <Button 
              className="w-full bg-[#51cb20] hover:bg-[#45a049] text-white rounded-xl py-6"
              onClick={() => router.push('/dashboard')}
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 text-sm text-muted-foreground">
        <p>Have questions about our plans? <span className="text-[#51cb20] cursor-pointer hover:underline">Contact support</span></p>
      </div>
    </div>
  )
}

export default UpgradePlans