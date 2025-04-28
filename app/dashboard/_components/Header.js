import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-end rounded-2xl items-center p-4 bg-slate-50 text-white'>
      <UserButton />
    </div>
  )
}

export default Header