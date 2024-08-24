import { UserTableType } from '@/server/schema'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Button from '../shared/Button';
import { roletype } from '@/types';

export default function UserModal({
    setIsModal,
    user,
    handleEdit,
    values,
    setValues
}: {
    user: UserTableType;
    setIsModal: Dispatch<SetStateAction<{ isOpen: boolean, id: string }>>
    handleEdit: (type: 'edit' | 'delete', id: string) => void;
    values: {
        isApproved: boolean;
        role: roletype;
    };
    setValues: Dispatch<SetStateAction<{
        isApproved: boolean;
        role: roletype;
    }>>
}) {

    return (
        <div className='absolute top-0 flex items-center justify-center p-2 left-0 w-full h-full bg-black/35'>
            <div className='relative max-w-[400px] gap-2 text-sm  w-full flex flex-col rounded bg-white p-4'>
                <div className='w-full flex gap-1 flex-col'>
                    <h1>Email : {user.email}</h1>
                    <h1>
                        User Approval :
                    </h1>
                    <div className='flex w-full flex-col'>
                        <label htmlFor='approve'>Slect approval State</label>
                        <select defaultValue={user.isapproved ? '1' : '0'}
                            onChange={e => setValues(p => ({ ...p, isApproved: e.target.value === '0' ? false : true }))}
                            className='outline-none border rounded-sm py-1' name='approve' id='approve'>
                            <option value='0'>false</option>
                            <option value='1'>true</option>
                        </select>
                    </div>
                </div>
                <div className=' w-full flex gap-1 flex-col'>
                    <h1>
                        User Role :
                    </h1>
                    <div className='flex w-full flex-col'>
                        <label htmlFor='role'>Slect Role</label>
                        <select defaultValue={user.role}
                            onChange={e => setValues(p => ({ ...p, role: e.target.value as roletype }))}
                            className='outline-none border rounded-sm py-1' name='role' id='role'>
                            <option value='BASIC'>BASIC</option>
                            <option value='ADMIN'>ADMIN</option>
                            <option value='OWNER'>OWNER</option>
                        </select>
                    </div>
                </div>
                <div className='flex w-full gap-1 items-center justify-end'>
                    <Button type='button' className='py-1 px-3 rounded-sm border-2 border-gray-300 bg-black/10' title='Close' onClick={() => setIsModal(prev => ({ ...prev, isOpen: false }))} />
                    <Button type='button' className='py-[0.35rem] px-3 rounded-sm bg-blue-500 text-white' title='Update' onClick={() => handleEdit('edit', user.id)} />
                </div>
            </div>
        </div>
    )
}
