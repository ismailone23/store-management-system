'use client'

import React, { Dispatch, FormEvent, MutableRefObject, SetStateAction, useMemo, useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import useMessage from '@/context/useMessage';
import { api } from '@/trpc/client';
import { purchasedlist } from '@/types';

export default function CreateInvoice({
    setIsOpen,
    handleSubmit,
    formRef
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>, list: purchasedlist[]) => Promise<void>;
    formRef: MutableRefObject<HTMLFormElement | null>;
}) {
    const productapiforincoice = api.productRouter.getProdcts.useQuery('invoice')
    const { data } = productapiforincoice
    const { isLoading } = useMessage()
    const [quantity, setQuantity] = useState<number>(0)
    const [list, setList] = useState<purchasedlist[]>([])

    function handlecng(productid: string) {
        const checkisexist = list.filter(pr => pr.productid == productid)
        if (checkisexist.length > 0 || quantity < 1 || productid === '0000') return
        const filterprice = data?.filter(fld => fld.prices.productid == productid)
        if (!filterprice || filterprice.length < 1) return
        setList(prev => ([...prev, { productid, quantity, mrp: filterprice[0].prices.mrp }]))
    }
    const mrpbill = useMemo(() => {
        if (!data || data.length < 1 || list.length < 1) return 0
        let x: number = 0
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            const prices = data.filter(flitem => flitem.prices.productid == list[i].productid)[0].prices
            const mrpcalc = Math.round(prices.mrp - prices.mrp * (prices.discount / 100))
            x += (mrpcalc * list[i].quantity)
        }
        return x
    }, [data, list])
    const [bills, setBills] = useState<{ tax: number, exdiscount: number, tbill: number }>({ tax: 0, exdiscount: 0, tbill: 0 })
    function sendDataOnSubmit(e: FormEvent<HTMLFormElement>) {
        handleSubmit(e, list)
    }
    function calcTotal() {
        setBills(p => ({ ...p, tbill: mrpbill + bills.tax - bills.exdiscount }))
    }
    return (
        <div className='absolute top-0 flex p-2 left-0 w-full overflow-hidden h-full bg-black/35'>
            <div className='w-full max-h-full flex justify-center items-center'>
                <div className='relative max-w-[400px] h-auto overflow-y-auto no-scrollbar w-full gap-2 text-sm flex flex-col rounded bg-white p-4'>
                    <h1 className='w-full text-center text-base'>Create New Invoice</h1>
                    <form ref={formRef} onSubmit={(e) => sendDataOnSubmit(e)} className='w-full flex flex-col gap-1'>
                        <Input required
                            title='Dealer Code'
                            type='number' name='dealerid'
                            placeholder='240000' />
                        <Input onChange={e => setQuantity(Number(e.target.value))}
                            value={quantity} required title='Quantity'
                            type='number'
                            name='quantity' placeholder='1'
                        />
                        <div className='flex w-full flex-col'>
                            <label htmlFor="pselect">Select Product</label>
                            <select onChange={e => handlecng(e.target.value)} className='outline-none border text-gray-700 border-gray-100 py-1 px-2 rounded-sm' name="pselect" id="pselect">
                                <option value="0000">Select One</option>
                                {(data && data.length > 0) && data.map(({ products }, i) =>
                                    <option key={i} value={products.id}>{products.productname}</option>
                                )}
                            </select>
                        </div>
                        <div className='text-xs flex flex-col gap-1'>
                            {list.length > 0 && list.map((ld, i) =>
                                <div onClick={() => setList(list.filter(item => item.productid !== ld.productid))} key={i} className='flex items-center'>
                                    <span>{i + 1}. {data?.filter(fd => fd.products.id == ld.productid)[0].products.productname}</span>
                                    <span>({ld.quantity})</span>
                                </div>
                            )}
                        </div>

                        <Input dval={mrpbill} readOnly title='MRP' type='number' name='mrp' placeholder='0.00' />

                        <Input title='Extra Discount' value={bills.exdiscount} onChange={(e) => setBills(p => ({ ...p, exdiscount: Number(e.target.value) }))}
                            type='number' name='exdiscount' placeholder='0.00 tk' />

                        <Input onChange={(e) => setBills(p => ({ ...p, tax: Number(e.target.value) }))}
                            value={bills.tax} title='Taxs' type='number' name='tax' placeholder='0' />

                        <div className='flex mb-2 gap-1 w-full items-end'>
                            <Input required={true} dval={bills.tbill} readOnly title='Total Bill' type='number' name='tbill' placeholder='0' />
                            <Button type='button'
                                disabled={isLoading}
                                className='py-[0.35rem] px-3 rounded-sm bg-gray-700 text-white'
                                title='='
                                onClick={() => calcTotal()}
                            />
                        </div>
                        <div className='flex w-full gap-1 items-center justify-end'>
                            <Button onClick={() => setIsOpen(false)} type='button'
                                className='py-1 px-3 rounded-sm border-2 border-gray-300 bg-black/10'
                                title='Close'
                            />
                            <Button type='submit'
                                disabled={isLoading}
                                className='py-[0.35rem] px-3 rounded-sm bg-blue-500 text-white'
                                title='Create'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
