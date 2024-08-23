import { UserTableType } from '@/server/schema'
import React from 'react'
import MapUser from './mapuser'

export default function DisplayUser({ users }: { users: UserTableType[] }) {
    return (
        <div className='flex w-full flex-col px-4 min text-sm min-w-[700px]'>
            <div className='grid grid-cols-10 border-b'>
                <div className='flex w-full border-r'><h1 className='text-center w-full'>Sl no.</h1></div>
                <div className='flex w-full border-r col-span-2'><h1 className='text-center w-full'>Name</h1></div>
                <div className='flex w-full border-r col-span-3'><h1 className='text-center w-full'>Email</h1></div>
                <div className='flex w-full border-r col-span-2'><h1 className='text-center w-full'>Is Approved</h1></div>
                <div className='flex w-full border-r'><h1 className='text-center w-full'>Role</h1></div>
                <div className='flex w-full'><h1 className='text-center w-full'>Actions</h1></div>
            </div>
            <div className='flex flex-col w-full'>
                {
                    users.map((user, i) => <MapUser user={user} i={i} key={i} />)
                }
            </div>
        </div>
    )
}
