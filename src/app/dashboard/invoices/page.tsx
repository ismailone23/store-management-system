'use client'
import CreateInvoice from '@/components/invoices/create-invoice'
import DisplayInvoices from '@/components/invoices/DisplayInvoices'
import InfoInvoice from '@/components/invoices/InfoInvoice'
import DateFilter from '@/components/shared/DateFilter'
import Metadata from '@/components/shared/Metadata'
import useMessage from '@/context/useMessage'
import { api } from '@/trpc/client'
import { invoiceformtype, purchasedlist } from '@/types'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState<{ from: string, to: string }>({ from: '', to: '' })
    const formRef = useRef<HTMLFormElement>(null)
    const { setIsLoading, setMessage } = useMessage();
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const [id, setId] = useState<string | null>(null)
    const invoiceapi = api.invoiceRoute.getInvoices.useQuery()

    const { isFetching, isError, data } = invoiceapi
    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        return data
    }, [isFetching, data, isError]);

    const createinvoiceapi = api.invoiceRoute.createInvoice.useMutation({
        onSuccess: () => {
            setMessage({ error: false, text: 'Customer Created' })
            setIsLoading(false)
            invoiceapi.refetch();
            setIsOpen(false)
            formRef.current?.reset()
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });

    const session = useSession();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>, list: purchasedlist[]) => {
        e.preventDefault();
        const formdata = new FormData(formRef.current as HTMLFormElement)
        const {
            dealerid,
            mrp,
            exdiscount,
            tax,
            tbill
        } = Object.fromEntries(formdata) as invoiceformtype
        createinvoiceapi.mutate({
            createdby: String(session.data?.user.email),
            dealerid: Number(dealerid),
            exdiscount: Number(exdiscount),
            mrp: Number(mrp),
            tax: Number(tax),
            tbill: Number(tbill),
            purchasedlist: list
        })
    }
    useEffect(() => {
        const datemaker = (date: string) => new Date(date)
        console.log({ from: datemaker(date.from), to: datemaker(date.to) });
    }, [date])
    return (
        <>
            <Metadata seoTitle='Invoices | SuperFaster' />
            <div className='w-full flex flex-col'>
                <DateFilter date={date} setDate={setDate} setIsOpen={setIsOpen} />
                <div className='flex flex-col no-scrollbar sm:px-2 overflow-auto text-sm'>
                    {catchedMutateData && <DisplayInvoices setId={setId} setIsMoreOpen={setIsMoreOpen} invoices={catchedMutateData} />}
                </div>
            </div>
            {
                isOpen && <CreateInvoice setIsOpen={setIsOpen} handleSubmit={handleSubmit} formRef={formRef} />
            }
            {
                (isMoreOpen && catchedMutateData) && <InfoInvoice invoices={catchedMutateData} setId={setId} id={id} setIsMoreOpen={setIsMoreOpen} />
            }
        </>
    )
}
