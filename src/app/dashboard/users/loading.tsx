import React from 'react'

export default function loading() {
    return (
        <div className='w-full flex items-center h-screen justify-center'>
            <div className='flex max-w-[100px]'>
                <div className='w-10 h-10 border-r-2 rounded-full border-gray-800 animate-spin ease-in-out' />
            </div>
        </div>
    )
}
