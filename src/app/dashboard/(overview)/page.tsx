'use client'
import Button from '@/components/shared/Button';
import Metadata from '@/components/shared/Metadata';
import { signOut } from 'next-auth/react';
import React from 'react'

export default function Page() {
    return (
        <>
            <Metadata seoTitle='Overview | SuperFaster' />
            <div className='flex flex-col h-auto'>
                <div className='break-words'>

                </div>
                <div>

                </div>
                <Button className='bg-gray-700 text-white py-2 w-20 rounded outline-none' title='Signout' type='button' onClick={() => {
                    signOut()
                }} />
            </div>
        </>
    )
}
