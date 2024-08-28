import React, { Dispatch, FormEvent, MutableRefObject, SetStateAction } from 'react'
import Input from '@/components/shared/Input'

export default function CreateCollection({
    setIsOpen,
    formRef,
    handleSubmit

}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    formRef: MutableRefObject<HTMLFormElement | null>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
    return (
        <div className='absolute top-0 flex p-2 left-0 w-full overflow-hidden h-full bg-black/35'>
            <div className='w-full max-h-full flex justify-center items-center'>
                <div className='relative max-w-[400px] h-auto overflow-y-auto no-scrollbar w-full gap-2 text-sm flex flex-col rounded bg-white p-4'>
                    <h1 className='w-full text-center text-base'>Create New Invoice</h1>
                    <form ref={formRef} onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col gap-2'>
                        <Input name='dealerid' placeholder='240000' title='Dealer Id' type='number' autoFocus />
                        <Input name='amount' placeholder='001' title='Amount' type='number' />
                        <div className='flex gap-1 w-full'>
                            <button type='button' className='px-2 py-1 rounded-sm text-white bg-gray-700' onClick={() => setIsOpen(false)}>Close</button>
                            <button type='submit' className='px-2 py-1 rounded-sm text-white bg-blue-500'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
