'use client'
import useMessage from '@/context/useMessage'
import React from 'react'

export default function Loading() {
    const { isLoading } = useMessage()
    return isLoading && (
        <div className='absolute w-full top-0 left-0 h-1 bg-blue-400' />
    )
}
