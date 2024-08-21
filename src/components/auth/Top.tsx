import Image from 'next/image'
import React from 'react'

export default function Top({ title }: { title: string }) {
    return (
        <div className='flex flex-col items-center w-full'>
            <Image className='filter' src={'/static/S02.png'} alt='kogo' width={100} height={50} />
            <h1 className='text-center'>{title}</h1>
        </div>
    )
}
