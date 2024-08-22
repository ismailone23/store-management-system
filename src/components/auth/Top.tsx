import Image from 'next/image'
import React from 'react'

export default function Top({ title }: { title: string }) {
    return (
        <div className='flex flex-col items-center w-full'>
            <Image src={'https://firebasestorage.googleapis.com/v0/b/stuf-f9656.appspot.com/o/blob%3Ahttps%3A%2Fproduct-tracker-five.vercel.app%2F0c269906-14a2-4406-a922-c3d5eafb9e07?alt=media&token=4a3d751c-0357-4a26-9f53-75170c59223a'} alt='kogo' width={100} height={50} />
            <h1 className='text-center'>{title}</h1>
        </div>
    )
}
