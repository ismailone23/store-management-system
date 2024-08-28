'use client'
import React, { Dispatch, FormEvent, MutableRefObject, SetStateAction } from 'react'
import Button from '@/components/shared/Button';
import useMessage from '@/context/useMessage';
import Input from '@/components/shared/Input';

export default function CreateCustomer({
    setIsOpen,
    handleSubmit,
    formRef
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    formRef: MutableRefObject<HTMLFormElement | null>;
}) {
    const { isLoading } = useMessage()
    return (
        <div className='absolute top-0 flex p-2 left-0 w-full overflow-hidden h-full bg-black/35'>
            <div className='w-full max-h-full flex justify-center items-center'>
                <div className='relative max-w-[400px] h-auto overflow-y-auto no-scrollbar w-full gap-2 text-sm flex flex-col rounded bg-white p-4'>
                    <h1 className='w-full text-center text-base'>Create New Customer</h1>
                    <form ref={formRef} onSubmit={handleSubmit} className="flex w-full flex-col gap-1">
                        <Input autoFocus name='name' placeholder='John' title='Name' type='text' />
                        <Input name='number' placeholder='01*********' title='Contact' type='number' />
                        <div className='flex w-full gap-1 mt-2 items-center justify-end'>
                            <Button onClick={() => setIsOpen(false)} type='button'
                                className='py-1 px-3 rounded-sm border-2 border-gray-300 bg-black/10'
                                title='Close'
                            />
                            <Button type='submit'
                                disabled={isLoading}
                                className='py-[0.35rem] px-3 rounded-sm bg-gray-700 text-white'
                                title='Create'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
