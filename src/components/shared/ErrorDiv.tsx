'use client'
import useMessage from '@/context/useMessage'
import clsx from 'clsx'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export default function ErrorDiv() {
    const { message } = useMessage()

    return (
        <div className={clsx('w-full gap-1 flex items-center py-2 px-2 rounded',
            message?.error ?
                "bg-red-400/20 text-red-600 " :
                "bg-emerald-400/20 text-emerald-600 "
        )}>
            {message?.error ? <ExclamationTriangleIcon className='w-5 text-red-500' /> :
                <CheckCircleIcon className='w-5 text-emerald-500' />}
            <p className='text-sm'>{message?.text}</p>
        </div>
    )
}
