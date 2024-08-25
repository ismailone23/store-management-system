'use client'
import CreateCustomer from '@/components/customers/create-customer'
import DisplayCustomer from '@/components/customers/DisplayCustomer'
import Metadata from '@/components/shared/Metadata'
import SmButton from '@/components/shared/SmButton'
import useMessage from '@/context/useMessage'
import { api } from '@/trpc/client'
import React, { FormEvent, useMemo, useRef, useState } from 'react'
import Loading from '@/app/dashboard/stocks/loading'

export default function page() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { setIsLoading, setMessage } = useMessage()
    const getCustomerApi = api.customerRoute.getCustomers.useQuery()

    const { isFetching, isError, data } = getCustomerApi
    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        return data
    }, [isFetching, data, isError]);

    const updateCustomerApi = api.customerRoute.updateCustomer.useMutation({
        onSuccess: () => {
            setMessage({ error: false, text: 'Customer updated' })
            setIsLoading(false)
            getCustomerApi.refetch();
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    const deleteCustomerApi = api.customerRoute.deleteCustomer.useMutation({
        onSuccess: () => {
            setMessage({ error: true, text: 'Customer Deleted' })
            setIsLoading(false)
            getCustomerApi.refetch();
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    const createCustomerApi = api.customerRoute.createCustomer.useMutation({
        onSuccess: () => {
            setMessage({ error: false, text: 'Customer Created' })
            setIsLoading(false)
            getCustomerApi.refetch();
            setIsOpen(false)
            formRef.current?.reset()
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formdata = new FormData(formRef.current as HTMLFormElement)
        const { name, number } = Object.fromEntries(formdata) as { name: string; number: string };
        createCustomerApi.mutate({ name, number })
    }
    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const handleDelete = async (id: number) => {
        deleteCustomerApi.mutate(id)
    }
    return (
        <>

            <Metadata seoTitle='Customers | SuperFaster' />
            <div className='w-full flex flex-col sm:p-2'>
                <div className='w-full justify-between flex items-end'>
                    <h1>All Customers Details</h1>
                    <SmButton setIsOpen={setIsOpen} title='Create Customer' />
                </div>
                <div>
                    {
                        isFetching ? <Loading /> : (catchedMutateData && <DisplayCustomer handleDelete={handleDelete} customers={catchedMutateData} />)
                    }
                </div>
            </div>
            {isOpen && <CreateCustomer handleSubmit={handleSubmit} setIsOpen={setIsOpen} formRef={formRef} />}
        </>
    )
}
