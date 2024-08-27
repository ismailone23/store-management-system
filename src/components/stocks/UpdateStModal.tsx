'use client'

import React, { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction, useEffect, useMemo, useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Image from 'next/image';
import { productsjointype } from '@/types';
import useMessage from '@/context/useMessage';
import { handleUpdate } from '@/lib/stockaction';
import { useSession } from 'next-auth/react';
import { productupdateapitype } from '../type';

export default function UpdateStModal({
    setIsUpModalOpen,
    upformRef,
    product,
    isUpModelOpen,
    productupdateapi
}: {
    setIsUpModalOpen: Dispatch<SetStateAction<{ open: boolean; id: string }>>;
    upformRef: MutableRefObject<HTMLFormElement | null>;
    product: productsjointype,
    isUpModelOpen: { open: boolean; id: string }
    productupdateapi: productupdateapitype
}) {
    const { data: session } = useSession()
    const { isLoading, setMessage, setIsLoading } = useMessage()
    const [image, setImage] = useState<string | null>(null)
    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            return setImage(URL.createObjectURL(e.target.files[0]));
        }
        setImage(product.products.image)
    }
    const x = useMemo(() => setImage(product.products.image), [product])
    return (
        <div className='absolute top-0 flex p-2 left-0 w-full overflow-hidden h-full bg-black/35'>
            <div className='w-full h-full flex justify-center md:items-center'>
                <div className='relative max-w-[450px] h-auto overflow-y-auto no-scrollbar w-full gap-2 text-sm flex flex-col rounded bg-white p-4'>
                    <h1 className='w-full text-center text-base'>Create New Product</h1>
                    <form ref={upformRef} onSubmit={(e) => handleUpdate(e, setMessage, setIsLoading, upformRef, session, isUpModelOpen, productupdateapi)} className='w-full flex flex-col gap-1'>
                        <Input value={product.products.productname} required title='Product Name' type='text' name='productname' placeholder='01FF' />
                        <Input value={product.prices.purchasedprice} title='Purchased Price' type='number' name='purchasedprice' placeholder='0.00' />
                        <Input value={product.prices.mrp} title='MRP' type='number' name='mrp' placeholder='0.00' />
                        <Input title='Add or Remove from stock (+/-) ' type='number' name='totalstock' placeholder='0' />
                        <Input value={product.stocks.totalstock} readOnly title='Total in stock' type='number' name='stock' placeholder='0' />
                        <Input value={product.prices.discount} title='Discount(%)' type='number' name='discount' placeholder='0%' />
                        <div className='flex flex-col w-full'>
                            <label className="text-[0.9rem]" htmlFor='image'>Product Image</label>
                            <input onChange={(e) => handleFile(e)}
                                className={'outline-none focus:border-blue-400 text-black border-2 ease-in-out placeholder:text-gray-400 border-gray-100 rounded py-1 px-2'}
                                type='file' name='image' id='image'
                            />
                        </div>
                        <div className='w-32 h-24 border'>
                            {image &&
                                image === 'no image' ?
                                <Image priority src={'/static/nophoto.jpeg'} alt='product image' className='w-full rounded h-full object-cover' width='0' height='0' sizes='100vw' />
                                :
                                <Image priority src={image as string} alt='product image' className='w-full h-full rounded object-cover' width='0' height='0' sizes='100vw' />
                            }
                        </div>
                        <div className='flex w-full gap-1 items-center justify-end'>
                            <Button onClick={() => setIsUpModalOpen(p => ({ open: false, id: '' }))} type='button'
                                className='py-1 px-3 rounded-sm border-2 border-gray-300 bg-black/10'
                                title='Close'
                            />
                            <Button type='submit'
                                disabled={isLoading}
                                className='py-[0.35rem] px-3 rounded-sm bg-blue-500 text-white'
                                title='Update'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
