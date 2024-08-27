'use client'

import React, { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction, useState } from 'react'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Image from 'next/image';
import useMessage from '@/context/useMessage';
import { handleSubmit } from '@/lib/stockaction';
import { useSession } from 'next-auth/react';
import { createproductapitype } from '../type';

export default function CreateStModal({
    setIsModalOpen,
    formRef,
    createproductapi
}: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    formRef: MutableRefObject<HTMLFormElement | null>;
    createproductapi: createproductapitype
}) {
    const [image, setImage] = useState<string | null>(null)
    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            return setImage(URL.createObjectURL(e.target.files[0]));
        }
        setImage(null)
    }
    const { data: session } = useSession()
    const { isLoading, setIsLoading, setMessage } = useMessage()

    return (
        <div className='absolute top-0 flex p-2 left-0 w-full overflow-hidden h-full bg-black/35'>
            <div className='w-full h-full flex justify-center md:items-center'>
                <div className='relative max-w-[400px] h-auto overflow-y-auto no-scrollbar w-full gap-2 text-sm flex flex-col rounded bg-white p-4'>
                    <h1 className='w-full text-center text-base'>Create New Product</h1>
                    <form ref={formRef} onSubmit={(e) => handleSubmit(e, setMessage, setIsLoading, formRef, session, createproductapi)} className='w-full flex flex-col gap-1'>
                        <Input required title='Product Name' type='text' name='productname' placeholder='01FF' />
                        <Input title='Purchased Price' type='number' name='purchasedprice' placeholder='0.00' />
                        <Input title='MRP' type='number' name='mrp' placeholder='0.00' />
                        <Input title='Stock' type='number' name='totalstock' placeholder='0' />
                        <Input title='Discount(%)' type='number' name='discount' placeholder='0%' />
                        <div className='flex flex-col w-full'>
                            <label className="text-[0.9rem]" htmlFor='image'>Product Image</label>
                            <input onChange={(e) => handleFile(e)}
                                className={'outline-none focus:border-blue-400 text-black border-2 ease-in-out placeholder:text-gray-400 border-gray-100 rounded py-1 px-2'}
                                type='file' name='image' id='image'
                            />
                        </div>
                        <div className='flex w-full gap-1 items-center justify-end'>
                            <Button onClick={() => setIsModalOpen(false)} type='button'
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
                    {image && <Image priority src={image as string} className='rounded border border-gray-200 object-contain w-48 h-32' alt="product image" height='0' width='0' sizes='100vw' />}
                </div>
            </div>
        </div>
    )
}
