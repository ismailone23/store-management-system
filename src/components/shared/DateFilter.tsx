'use client'
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import SmButton from './SmButton';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

export default function DateFilter({
    setIsOpen,
    date,
    setDate,
    handleSearch
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    date: {
        from: Date;
        to: Date;
    };
    setDate: Dispatch<SetStateAction<{
        from: Date;
        to: Date;
    }>>;
    handleSearch: () => void
}) {
    const daten = useMemo(() => { return String(new Date(Date.now())) }, [])
    const [queryDate, setQueryDate] = useState<{ from: string, to: string }>({ from: daten, to: daten })

    useEffect(() => {
        const datemaker = (date: string) => new Date(date)
        const timeOutId = setTimeout(() => setDate({ from: datemaker(queryDate.from), to: datemaker(queryDate.to) }), 700);
        return () => clearTimeout(timeOutId);
    }, [queryDate, setDate]);
    return (
        <div className='w-full flex items-center sm:px-2 sm:py-2 py-1 justify-between text-sm'>
            <div className="flex sm:flex-row flex-col items-start sm:items-center gap-1">
                <div className='flex items-center gap-1'>
                    <label htmlFor="from">From :</label>
                    <input onChange={e => setQueryDate(p => ({ ...p, from: e.target.value }))}
                        type="date" name="from" id="from" className='outline-none border-gray-100 px-2 py-1 border' />
                </div>
                <div className='flex items-center gap-1'>
                    <label htmlFor="to">To :</label>
                    <input onChange={e => setQueryDate(p => ({ ...p, to: e.target.value }))}
                        type="date" name="to" id="to" className='ml-4 sm:ml-0 outline-none border-gray-100 px-2 py-1 border' />
                </div>
            </div>
            <div className='flex gap-1 sm:flex-row flex-col'>
                <button onClick={() => handleSearch()} className='px-2 gap-1 py-1 items-center flex justify-center border rounded-sm'><span className='sm:block hidden'>Search</span> <ArrowPathRoundedSquareIcon className='w-4' /></button>
                <SmButton setIsOpen={setIsOpen} title='Create Invoice' />
            </div>
        </div>
    )
}
