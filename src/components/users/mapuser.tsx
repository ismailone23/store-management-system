import { UserTableType } from '@/server/schema'
import React from 'react'
import Button from '../shared/Button'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function MapUser({ user, i }: { i: number; user: UserTableType }) {
    return (
        <div className='grid grid-cols-10 items-center border-b'>
            <div className='flex border-r py-1 w-full truncate'><h1>{i + 1}</h1></div>
            <div className='flex border-r py-1 px-2 w-full truncate col-span-2'><h1>{user.name}</h1></div>
            <div className='flex border-r py-1 px-2 w-full truncate col-span-3'><h1>{user.email}</h1></div>
            <div className='flex border-r py-1 px-2 w-full truncate col-span-2'><h1>{user.isapproved ? 'approved' : 'unapproved'}</h1></div>
            <div className='flex border-r py-1 px-2 w-full truncate'><h1>{user.role}</h1></div>
            <div className='flex w-full justify-center gap-2 truncate items-center'>
                <Button title='' className='' type='button' Icon={<PencilSquareIcon className='w-4 text-gray-700' />} />
                <Button title='' className='' type='button' Icon={<TrashIcon className='w-4 text-gray-700' />} />
            </div>
        </div>
    )
}
