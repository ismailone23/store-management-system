import { UserTableType } from '@/server/schema'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '../shared/Button'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function MapUser({ user,
    i,
    handleEdit,
    setIsModal
}: {
    setIsModal: Dispatch<SetStateAction<{ id: string, isOpen: boolean }>>;
    handleEdit: (type: 'edit' | 'delete', id: string) => void;
    i: number;
    user: UserTableType
}) {
    return (
        <div className='grid grid-cols-10 items-center border-b'>
            <div className='flex border-r py-1 w-full truncate text-center'><h1 className='w-full'>{i + 1}</h1></div>
            <div className='whitespace-nowrap inline-block border-r py-1 px-2 w-full col-span-2'><h1 className='truncate' >{user.name}</h1></div>
            <div className='border-r py-1 px-2 w-full truncate col-span-3'><h1>{user.email}</h1></div>
            <div className='border-r py-1 px-2 w-full truncate col-span-2'><h1>{user.isapproved ? 'approved' : 'unapproved'}</h1></div>
            <div className='border-r py-1 px-2 w-full truncate'><h1>{user.role}</h1></div>
            <div className='flex w-full justify-center gap-2 truncate items-center'>
                <Button onClick={() => setIsModal({ id: user.id, isOpen: true })} type='button' Icon={<PencilSquareIcon className='w-4 text-blue-500' />} />
                <Button onClick={() => handleEdit('delete', user.id)} type='button' Icon={<TrashIcon className='w-4 text-rose-400' />} />
            </div>
        </div>
    )
}
