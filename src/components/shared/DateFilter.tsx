'use client'
import React, { Dispatch, SetStateAction } from 'react'
import SmButton from './SmButton';

export default function DateFilter({
    setIsOpen,
    date,
    setDate
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    date: {
        from: string;
        to: string;
    };
    setDate: Dispatch<SetStateAction<{
        from: string;
        to: string;
    }>>
}) {
    return (
        <div className='w-full flex items-center px-2 py-2 justify-between text-sm'>
            <div className="flex items-center gap-1">
                <div className='flex items-center gap-1'>
                    <label htmlFor="from">From :</label>
                    <input value={date.from} onChange={e => setDate(p => ({ ...p, from: e.target.value }))}
                        type="date" name="from" id="from" className='outline-none border-gray-100 px-2 py-1 border' />
                </div>
                <div className='flex items-center gap-1'>
                    <label htmlFor="to">To :</label>
                    <input value={date.to} onChange={e => setDate(p => ({ ...p, to: e.target.value }))}
                        type="date" name="to" id="to" className='outline-none border-gray-100 px-2 py-1 border' />
                </div>
            </div>
            <SmButton setIsOpen={setIsOpen} title='Create Invoice' />
        </div>
    )
}
