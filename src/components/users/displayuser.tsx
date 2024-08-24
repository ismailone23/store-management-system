import { UserTableType } from '@/server/schema'
import React, { Dispatch, SetStateAction } from 'react'
import MapUser from './mapuser'

export default function DisplayUser({
    users,
    handleEdit,
    setIsModal

}: {
    setIsModal: Dispatch<SetStateAction<{ id: string, isOpen: boolean }>>;
    handleEdit: (type: 'edit' | 'delete', id: string) => void;
    users: UserTableType[]
}) {
    return (
        <div className='overflow-x-auto no-scrollbar w-full'>
            <div className='flex w-full flex-col text-sm min-w-[700px]'>
                <div className='grid grid-cols-10 border'>
                    <div className='flex w-full py-1 border-r'><h1 className='text-center w-full'>Sl no.</h1></div>
                    <div className='flex w-full py-1 border-r col-span-2'><h1 className='text-center w-full'>Name</h1></div>
                    <div className='flex w-full py-1 border-r col-span-3'><h1 className='text-center w-full'>Email</h1></div>
                    <div className='flex w-full py-1 border-r col-span-2'><h1 className='text-center w-full'>Is Approved</h1></div>
                    <div className='flex w-full py-1 border-r'><h1 className='text-center w-full'>Role</h1></div>
                    <div className='flex w-full py-1'><h1 className='text-center w-full'>Actions</h1></div>
                </div>
                <div className='flex flex-col border-r border-l w-full'>
                    {
                        users.map((user, i) => <MapUser setIsModal={setIsModal} handleEdit={handleEdit} user={user} i={i} key={i} />)
                    }
                </div>
            </div>
        </div>
    )
}
