'use client'
import CreateCollection from '@/components/collections/create-collection'
import DisplayCollection from '@/components/collections/DisplayCollection'
import Metadata from '@/components/shared/Metadata'
import SmButton from '@/components/shared/SmButton'
import useMessage from '@/context/useMessage'
import { api } from '@/trpc/client'
import React, { FormEvent, useMemo, useRef, useState } from 'react'

export default function Page() {
    const { setIsLoading, setMessage } = useMessage();
    const getcustomerapi = api.customerRoute.getCustomers.useQuery()
    const { isError, isFetching, data } = getcustomerapi
    const catchedData = useMemo(() => {
        if ((isError || isFetching) || !data) return []
        return data
    }, [isError, isFetching, data])
    const [isOpen, setIsOpen] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const updatecsapi = api.customerRoute.updateCustomer.useMutation({
        onSuccess: () => {
            setIsLoading(false)
            getcustomerapi.refetch()
            setIsOpen(false)
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        const formdata = new FormData(formRef.current as HTMLFormElement)
        const {
            dealerid,
            amount
        } = Object.fromEntries(formdata) as { dealerid: string, amount: string }
        updatecsapi.mutate({ dealerid: Number(dealerid), credit: Number(amount) })
    }
    return (
        <>
            <Metadata seoTitle='Collections | SuperFaster' />
            <div className='flex w-full text-sm flex-col sm:p-2'>
                <div className='flex justify-between py-1 w-full'>
                    <h1>Collection List</h1>
                    <SmButton setIsOpen={setIsOpen} title='New Collection' />
                </div>
                <div className='w-full flex overflow-auto no-scrollbar'>
                    <div className='min-w-[550px] w-full'>
                        <DisplayCollection catchedData={catchedData} />
                    </div>
                </div>
            </div>
            {
                isOpen && <CreateCollection handleSubmit={handleSubmit} formRef={formRef} setIsOpen={setIsOpen} />
            }
        </>
    )
}
