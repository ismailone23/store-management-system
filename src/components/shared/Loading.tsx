'use client'
import useMessage from '@/context/useMessage'
import React from 'react'

export default function Loading() {
    const { pageLoading } = useMessage()
    return pageLoading && (
        <div className='absolute w-full top-0 left-0 h-1 bg-blue-400' />
    )
}
