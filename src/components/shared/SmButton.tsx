'use client'
import useMessage from '@/context/useMessage';
import { PlusIcon } from '@heroicons/react/24/outline'
import React, { Dispatch, SetStateAction } from 'react'

export default function SmButton({ setIsOpen, title }: { title: string; setIsOpen: Dispatch<SetStateAction<boolean>>; }) {
    const { isLoading } = useMessage()
    return (
        <div className='text-sm'>
            <button disabled={isLoading} onClick={() => setIsOpen(true)}
                className='py-[0.35rem] disabled:bg-blue-400 sm:px-4 px-[0.4rem] flex justify-center w-full bg-blue-500 text-white rounded-sm'
            >
                <PlusIcon className='w-4 sm:hidden block' />
                <span className='sm:flex hidden'>{title}</span>
            </button>
        </div>
    )
}
