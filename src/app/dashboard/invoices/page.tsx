'use client'
import CreateInvoice from '@/components/invoices/create-invoice'
import DisplayInvoices from '@/components/invoices/DisplayInvoices'
import InfoInvoice from '@/components/invoices/InfoInvoice'
import DateFilter from '@/components/shared/DateFilter'
import Metadata from '@/components/shared/Metadata'
import useMessage from '@/context/useMessage'
import { api } from '@/trpc/client'
import { invoiceformtype, invoicetype, purchasedlist } from '@/types'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useMemo, useRef, useState } from 'react'
import Loading from '@/app/dashboard/stocks/loading'

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)
    const daten = useMemo(() => { return new Date(Date.now()) }, [])
    const [date, setDate] = useState<{ from: Date, to: Date }>({ from: daten, to: daten })
    const formRef = useRef<HTMLFormElement>(null)
    const { setIsLoading, setMessage } = useMessage();
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const [id, setId] = useState<string | null>(null)
    const invoiceapi = api.invoiceRoute.getInvoices.useQuery()

    const { isFetching, isError, data } = invoiceapi


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
    const searchinvoiceapi = api.invoiceRoute.searchInvoice.useMutation({
        onSuccess: () => {
            setIsLoading(false)
            setIsOpen(false)
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    const { data: sdata, isError: isErrorS } = searchinvoiceapi

    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        if (sdata) return sdata
        return data
    }, [isFetching, data, isError, sdata]);

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
    function handleSearch() {
        searchinvoiceapi.mutate({ from: date.from, to: date.to })
    }
    return (
        <>
            <Metadata seoTitle='Invoices | SuperFaster' />
            <div className='w-full flex flex-col'>
                <DateFilter handleSearch={handleSearch} date={date} setDate={setDate} setIsOpen={setIsOpen} />
                <div className='flex flex-col no-scrollbar sm:px-2 overflow-auto text-sm'>
                    {isFetching ? <Loading /> : catchedMutateData && <DisplayInvoices setId={setId} setIsMoreOpen={setIsMoreOpen} invoices={catchedMutateData} />}
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
