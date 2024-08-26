import { invoicetype } from '@/types'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React, { Dispatch, SetStateAction } from 'react'

export default function DisplayInvoices({
    invoices,
    setIsMoreOpen,
    setId
}: {
    invoices: invoicetype[];
    setIsMoreOpen: Dispatch<SetStateAction<boolean>>;
    setId: Dispatch<SetStateAction<string | null>>;
}) {
    return (
        <div className='flex min-w-[750px] flex-col border'>
            <div className='w-full grid grid-cols-8'>
                <div className='w-fill text-center border-r'>
                    <h1>
                        Sl.no
                    </h1>
                </div>
                <div className='w-fill col-span-2 text-center border-r'>
                    <h1>
                        Dealer Id
                    </h1>
                </div>
                <div className='w-fill col-span-2 text-center border-r'>
                    <h1>
                        MRP
                    </h1>
                </div>
                <div className='w-fill col-span-2 text-center border-r'>
                    <h1>
                        Total Bill
                    </h1>
                </div>
                <div className='w-fill text-center'>
                    <h1>
                        Actions
                    </h1>
                </div>
            </div>
            {invoices.length > 0 &&
                invoices.map(({ invoices, invoice_pricelist }, i) =>
                    <div key={i} className='w-full border-t grid grid-cols-8'>
                        <div className='w-fill text-center border-r'>
                            <h1>
                                {i + 1}
                            </h1>
                        </div>
                        <div className='w-fill col-span-2 text-center border-r'>
                            <h1>
                                {invoices.dealerid}
                            </h1>
                        </div>
                        <div className='w-fill col-span-2 text-center border-r'>
                            <h1>
                                {invoice_pricelist.mrp}
                            </h1>
                        </div>
                        <div className='w-fill col-span-2 text-center border-r'>
                            <h1>
                                {invoice_pricelist.tbill}
                            </h1>
                        </div>
                        <div className='w-fill text-center'>
                            <button onClick={() => (setIsMoreOpen(true), setId(invoices.id))}><InformationCircleIcon className='w-5 text-blue-500' /></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
