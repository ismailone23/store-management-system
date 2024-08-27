'use client'
import { useReactToPrint } from 'react-to-print';
import { api } from '@/trpc/client';
import { invoicetype, purchasedlist } from '@/types';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'

export default function InfoInvoice({
    setIsMoreOpen,
    setId,
    id,
    invoices
}: {
    setIsMoreOpen: Dispatch<SetStateAction<boolean>>;
    setId: Dispatch<SetStateAction<string | null>>;
    id: string | null,
    invoices: invoicetype[]
}) {
    const invoice = invoices.filter(inv => inv.invoices.id === id)[0]
    const purchasedlistjson: purchasedlist[] = JSON.parse(invoice.invoices.purchasedlist)
    const { data } = api.productRouter.getProdcts.useQuery()
    let pprice = 0
    for (let i = 0; i < purchasedlistjson.length; i++) {
        if (data && data.length > 0) {
            const plistprice = data.filter(prd => prd.prices.productid === purchasedlistjson[i].productid)[0]
            pprice += (plistprice.prices.purchasedprice * purchasedlistjson[i].quantity)
        }
    }
    const [isCustomerCopy, setIsCustomerCopy] = useState(false)
    const inforref = useRef<HTMLDivElement | null>(null)
    const handlePrint = useReactToPrint({
        content: () => inforref.current,
        removeAfterPrint: true,
    })
    return (
        <div className='absolute top-0 flex p-2 left-0 w-full overflow-hidden h-full bg-black/35'>
            <div className='w-full max-h-full flex items-center justify-center'>
                <div className='max-h-full no-scrollbar w-full flex max-w-[900px] sm:justify-center'>
                    <div className='w-full text-sm gap-2 flex flex-col rounded bg-white'>
                        <div className="flex flex-col overflow-x-auto no-scrollbar w-full p-4 gap-1" ref={inforref}>
                            <div className='flex flex-col gap-1'>
                                <h1>Created By : {invoice.invoices.createdby}</h1>
                                <h1>Dealer Id : {invoice.invoices.dealerid}</h1>
                                <h1>Date : {new Date(invoice.invoices.createdat).getDate()}-{new Date(invoice.invoices.createdat).getMonth() + 1}-{new Date(invoice.invoices.createdat).getFullYear()}</h1>
                            </div>
                            <div className='flex w-full'>
                                <table className='border min-w-[840px] w-full items-center'>
                                    <thead>
                                        <tr className=''>
                                            <td className='border-r text-center' >Sl.no</td>
                                            <td className='border-r text-center col-span-2' >Product Name</td>
                                            <td className='border-r text-center' >Quantity</td>
                                            {!isCustomerCopy && <td className='border-r text-center' >P. Price</td>}
                                            <td className='border-r text-center' >MRP</td>
                                            <td className='border-r text-center' >Tax</td>
                                            <td className='border-r text-center' >E. Discount</td>
                                            <td className='text-center border-r' >Total Bill</td>
                                            {!isCustomerCopy && <td className='text-center' >Profit</td>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(purchasedlistjson.length > 0 && data) && purchasedlistjson.map((list, i) =>
                                            <tr key={i}>
                                                <td className='border-r border-t text-center' >{i + 1}</td>
                                                <td className='border-r pl-1 border-t col-span-2'>{data.filter(prd => prd.products.id == list.productid)[0].products.productname}</td>
                                                <td className='border-r text-center border-t' >{list.quantity}</td>
                                                {!isCustomerCopy && <td className='border-r text-center border-t' >{data.filter(prd => prd.products.id == list.productid)[0].prices.purchasedprice}</td>}
                                                <td className='border-r text-center border-t' >{Math.round(data.filter(prd => prd.products.id == list.productid)[0].prices.mrp - (data.filter(prd => prd.products.id == list.productid)[0].prices.mrp * (data.filter(prd => prd.products.id == list.productid)[0].prices.discount / 100)))}</td>
                                                {i == 0 && <td className={`border-r text-center border-t`} rowSpan={purchasedlistjson.length} >{invoice.invoice_pricelist.tax}</td>}
                                                {i == 0 && <td className={`border-r text-center border-t`} rowSpan={purchasedlistjson.length} >{invoice.invoice_pricelist.exdiscount}</td>}
                                                {i == 0 && <td className={`border-t text-center border-r`} rowSpan={purchasedlistjson.length} >{invoice.invoice_pricelist.tbill}</td>}
                                                {(!isCustomerCopy && i == 0) && <td className={`border-t text-center`} rowSpan={purchasedlistjson.length} >{Math.round(invoice.invoice_pricelist.tbill - pprice)}</td>}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex w-full justify-end gap-1 pb-4 pr-4'>
                            <button onClick={() => handlePrint()} className='px-2 py-1 bg-blue-500 text-white rounded-sm outline-none'>Print</button>
                            <button onClick={() => setIsCustomerCopy(!isCustomerCopy)} className='border px-2 py-1 text-gray-700 rounded-sm outline-none'>Show {isCustomerCopy ? 'Shop' : 'Customer'} Copy</button>
                            <button className='px-2 py-1 bg-gray-700 text-white rounded-sm outline-none' onClick={() => setIsMoreOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
