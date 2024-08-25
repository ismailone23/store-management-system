'use client'
import CreateInvoice from '@/components/invoices/create-invoice'
import DateFilter from '@/components/shared/DateFilter'
import Metadata from '@/components/shared/Metadata'
import React, { FormEvent, useEffect, useRef, useState } from 'react'

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState<{ from: string, to: string }>({ from: '', to: '' })
    const formRef = useRef<HTMLFormElement>(null)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            </div>
            {
                isOpen && <CreateInvoice setIsOpen={setIsOpen} handleSubmit={handleSubmit} formRef={formRef} />
            }
        </>
    )
}
