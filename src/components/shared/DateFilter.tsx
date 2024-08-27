'use client'
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import SmButton from './SmButton';

export default function DateFilter({
    setIsOpen,
    date,
    setDate
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    date: {
        from: Date;
        to: Date;
    };
    setDate: Dispatch<SetStateAction<{
        from: Date;
        to: Date;
    }>>
}) {
    const daten = useMemo(() => { return String(new Date(Date.now())) }, [])
    const [queryDate, setQueryDate] = useState<{ from: string, to: string }>({ from: daten, to: daten })

    useEffect(() => {
        const datemaker = (date: string) => new Date(date)
        const timeOutId = setTimeout(() => setDate({ from: datemaker(queryDate.from), to: datemaker(queryDate.to) }), 700);
        return () => clearTimeout(timeOutId);
    }, [queryDate, setDate]);
    return (
        <div className='w-full flex items-center px-2 py-2 justify-between text-sm'>
            <div className="flex items-center gap-1">
                <div className='flex items-center gap-1'>
                    <label htmlFor="from">From :</label>
                    <input onChange={e => setQueryDate(p => ({ ...p, from: e.target.value }))}
                        type="date" name="from" id="from" className='outline-none border-gray-100 px-2 py-1 border' />
                </div>
                <div className='flex items-center gap-1'>
                    <label htmlFor="to">To :</label>
                    <input onChange={e => setQueryDate(p => ({ ...p, to: e.target.value }))}
                        type="date" name="to" id="to" className='outline-none border-gray-100 px-2 py-1 border' />
                </div>
            </div>
            <SmButton setIsOpen={setIsOpen} title='Create Invoice' />
        </div>
    )
}
