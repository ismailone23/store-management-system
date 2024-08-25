'use client'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@/components/shared/Button'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import useMessage from '@/context/useMessage'

export default function StockTop
    ({
        setIsModalOpen,
        searchText,
        setSearchText
    }: {
        setIsModalOpen: Dispatch<SetStateAction<boolean>>;
        searchText: string;
        setSearchText: Dispatch<SetStateAction<string>>
    }) {
    const { isLoading } = useMessage();
    return (
        <div className='w-full sm:text-sm text-xs gap-2 flex justify-between items-center'>
            <div className="div w-full relative">
                <MagnifyingGlassIcon className='absolute w-4 text-gray-700 sm:top-2 top-[0.4rem] sm:left-[0.4rem] left-[0.35rem]' />
                <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    name="search"
                    placeholder='search product with name'
                    className='sm:py-[.35rem] py-[0.35rem] sm:px-6 pl-6 pr-1 placeholder:text-gray-500 text-gray-700 w-full rounded-sm outline-none border border-gray-200'
                />
            </div>
            <div className='sm:w-44'>
                <button disabled={isLoading} onClick={() => setIsModalOpen(true)}
                    className='py-[0.4rem] disabled:bg-blue-400 sm:px-0 px-[0.4rem] flex justify-center w-full bg-blue-500 text-white rounded-sm'
                >
                    <PlusIcon className='w-4 sm:hidden block' />
                    <span className='sm:flex hidden'>Create New Stock</span>
                </button>
            </div>
        </div>
    )
}
