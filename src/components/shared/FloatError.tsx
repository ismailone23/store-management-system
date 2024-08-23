'use client'
import useMessage from '@/context/useMessage'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'

export default function FloatError() {
    const { message, setMessage } = useMessage()

    return (
        <div onClick={() => setMessage(null)}
            className={clsx('w-full sm:max-w-[300px] max-w-[250px] absolute sm:right-3 right-1 top-2 gap-1 flex items-start py-2 px-2 rounded',
                message?.error ?
                    "bg-red-400 text-white" :
                    "bg-emerald-400/20 text-emerald-600 "
            )}>
            {message?.error ?
                <ExclamationTriangleIcon className='w-5 mt-1 text-white' />
                :
                <CheckCircleIcon className='w-5 text-emerald-500' />}
            <p className='text-sm'>{message?.text}</p>
        </div>
    )
}
