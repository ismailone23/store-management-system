'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SmButton from '@/components/shared/SmButton'

export default function StockTop
    ({
        setIsModalOpen,
        setSearchText
    }: {
        setIsModalOpen: Dispatch<SetStateAction<boolean>>;
        setSearchText: Dispatch<SetStateAction<string>>
    }) {
    const [sText, setSText] = useState<string>('')

    useEffect(() => {
        const timeOutId = setTimeout(() => setSearchText(sText), 700);
        return () => clearTimeout(timeOutId);
    }, [sText, setSearchText]);

    return (
        <div className='w-full sm:text-sm text-xs gap-2 flex justify-between items-center'>
            <div className="w-auto flex-1 relative">
                <MagnifyingGlassIcon className='absolute w-4 text-gray-700 sm:top-2 top-[0.4rem] sm:left-[0.4rem] left-[0.35rem]' />
                <input
                    onChange={(e) => setSText(e.target.value)}
                    type="text"
                    name="search"
                    placeholder='search product with name'
                    className='sm:py-[.35rem] py-[0.35rem] sm:px-6 pl-6 pr-1 placeholder:text-gray-500 text-gray-700 w-full rounded-sm outline-none border border-gray-200'
                />
            </div>
            <SmButton setIsOpen={setIsModalOpen} title='Create Stock' />
        </div>
    )
}
