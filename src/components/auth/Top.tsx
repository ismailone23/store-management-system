import Image from 'next/image'
import React from 'react'

export default function Top({ title }: { title: string }) {
    return (
        <div className='flex flex-col items-center w-full'>
            <Image src={'/favicon.ico'} className='w-28 h-16 filter' priority quality={100} alt='kogo' width='0' height='0' sizes="100vw" />
            <h1 className='text-center'>{title}</h1>
        </div>
    )
}
