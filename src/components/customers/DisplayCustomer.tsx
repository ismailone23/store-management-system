'use client'
import useMessage from '@/context/useMessage'
import { Customertype } from '@/server/schema'
import { InformationCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { Dispatch, SetStateAction } from 'react'

export default function DisplayCustomer({
    customers,
    handleDelete,
    setInfoCs
}: {
    customers: Customertype[];
    handleDelete: (id: number) => Promise<void>;
    setInfoCs: Dispatch<SetStateAction<{
        isopen: boolean;
        id: number;
    }>>
}) {
    const { setMessage } = useMessage()
    return (
        <div className='w-full flex flex-col text-sm overflow-x-auto mt-2 no-scrollbar'>
            <div className='min-w-[800px] flex flex-col border'>
                <div className="grid w-full grid-cols-9">
                    <div className='py-1 px-2 border-r w-full'><h1 className='text-center'>Sl no.</h1></div>
                    <div className='py-1 px-2 border-r w-full'><h1 className='text-center'> Dealer Id</h1></div>
                    <div className='col-span-2 py-1 border-r px-2'><h1 className='text-center'>Name</h1></div>
                    <div className='py-1 px-2 border-r w-full'><h1 className='text-center'>Phone</h1></div>
                    <div className='py-1 border-r w-full'><h1 className='text-center'>Total Debit</h1></div>
                    <div className='py-1 border-r w-full'><h1 className='text-center'>Total Credit</h1></div>
                    <div className='py-1 px-2 w-full col-span-2'><h1 className='text-center'>Actions</h1></div>
                </div>
                <div className='flex flex-col'>
                    {
                        customers.map(({ dealerid, name, number, totalcredit, totaldebit }, i) =>
                            <div key={i} className='grid border-t w-full grid-cols-9'>
                                <div className='px-2 py-1 border-r w-full'>
                                    <h1 className='w-full text-center'>{i + 1}</h1>
                                </div>
                                <div className='px-2 py-1 border-r w-full'>
                                    <h1 className='text-center' onClick={() => {
                                        navigator.clipboard.writeText(String(dealerid));
                                        setMessage({ error: false, text: 'Copied to Clipboard' })
                                    }}>{dealerid}</h1>
                                </div>
                                <div className='px-2 py-1 border-r w-full col-span-2 line-clamp-1'><h1 >{name}</h1></div>
                                <div className='py-1 px-2 border-r w-full'><h1 className='truncate'>{number}</h1></div>
                                <div className='px-2 py-1 border-r w-full'><h1 className='text-center'>{totaldebit}</h1></div>
                                <div className='px-2 py-1 border-r w-full'><h1 className='text-center'>{totalcredit}</h1></div>
                                <div className='col-span-2 py-1 justify-center flex w-full gap-2 px-2'>
                                    <button onClick={() => setInfoCs({ isopen: true, id: dealerid })}><InformationCircleIcon className='w-5' /></button>
                                    <button onClick={() => handleDelete(dealerid)}><TrashIcon className='w-5 text-red-400' /></button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
