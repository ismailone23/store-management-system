'use client'
import Button from '@/components/shared/Button';
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Page() {
    const session = useSession();
    return (
        <div className='flex flex-col h-auto'>
            <div className='break-words'>
                {JSON.stringify(session)}
            </div>
            <div>

            </div>
            <Button className='bg-gray-700 text-white py-2 w-20 rounded outline-none' title='Signout' type='button' onClick={() => signOut()} />
        </div>
    )
}
