import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className='w-full flex flex-col justify-between h-screen'>
            <div className=''>
                <Navbar />
            </div>
            <div className='overflow-hidden flex w-full h-full'>
                <div className='sm:flex hidden lg:max-w-48 md:max-w-44 sm:max-w-40 w-full'>
                    <Sidebar />
                </div>
                <div className='overflow-y-auto w-full h-full sm:px-0 px-4 '>
                    {children}
                </div>
            </div>
            <div className='border-t sm:hidden flex h-12'>
                <Sidebar />
            </div>
        </div>
    )
}
