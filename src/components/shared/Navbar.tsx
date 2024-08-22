'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
    const path = usePathname()
    const session = useSession();
    return (
        <div className='flex justify-between w-full items-center sm:px-0 px-3 sm:h-12 h-14 border-b'>
            <div className='sm:flex lg:max-w-48 md:max-w-44 sm:max-w-40 w-full sm:border-r h-full flex'>
                <Link href={'/dashboard'} className='sm:pl-3'>
                    <Image priority
                        className='w-[6.5rem] sm:h-12 h-[3.5rem] filter'
                        quality={100}
                        src={'/static/logo.png'}
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt='logo'
                    />
                </Link>
            </div>
            <div className='flex justify-between items-center sm:w-full px-2'>
                <h1 className='text-sm sm:flex hidden'>
                    <Link href={'/dashboard'} className={`${path.split('/').length > 0 ? "text-gray-400" : 'text-gray-700'}`}>Dashboard</Link>
                    <span> / </span>
                    {
                        path.split('/').length > 1 &&
                        <span className='capitalize text-gray-700'>{path.split('/')[2]}</span>
                    }
                </h1>
                <div className='sm:pr-3'>
                    {
                        session.status === 'authenticated' &&
                        <h1 className='text-gray-700'>{session.data.user.name}</h1>
                    }
                </div>
            </div>
        </div>
    )
}
