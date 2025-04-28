import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex items-center justify-center h-screen w-screen bg-[#fbfbf2]'>
            <SignUp />
        </div>
    )
}