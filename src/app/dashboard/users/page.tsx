'use client'
import Metadata from '@/components/shared/Metadata'
import DisplayUser from '@/components/users/displayuser'
import UserModal from '@/components/users/UserModal'
import { api } from '@/trpc/client'
import React, { useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSession } from 'next-auth/react'
import useMessage from '@/context/useMessage'
import { roletype } from '@/types'
import { getUserById } from '@/lib/utils/actions'

export default function Page() {
    const session = useSession()
    const { setMessage, setIsLoading } = useMessage()
    const [values, setValues] = useState<{ isApproved: boolean, role: roletype }>({ isApproved: false, role: 'BASIC' })
    const usersapi = api.userRouter.getUsers.useQuery()
    const { data, isError, isFetching } = usersapi
    const updateuserapi = api.userRouter.updateUser.useMutation({
        onSuccess() {
            usersapi.refetch()
            setIsLoading(false)
            setMessage({ error: false, text: 'user updated' })
            setIsModal({ isOpen: false, id: '' })
        },
        onError({ message }) {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    })
    const deleteuserapi = api.userRouter.deleteUser.useMutation({
        onSuccess() {
            usersapi.refetch()
            setIsLoading(false)
            setMessage({ error: false, text: 'user deleted' })
            setIsModal({ isOpen: false, id: '' })
        },
        onError({ message }) {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    })
    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        return data
    }, [isFetching, data, isError]);

    const [isModal, setIsModal] = useState<{ isOpen: boolean, id: string }>({ isOpen: false, id: '' })

    const handleEdit = async (type: 'edit' | 'delete', id: string) => {
        setMessage(null)
        if (session.data?.user.role !== 'BASIC') {
            const getUser = await getUserById(id)
            if (getUser?.role !== 'OWNER') {
                setIsLoading(true)
                if (type == 'delete') {
                    return deleteuserapi.mutate({ id })
                }
                else {
                    return updateuserapi.mutate({ id, isapproved: values.isApproved, role: values.role })
                }
            }
        }
        return setMessage({ error: true, text: 'you dont have the access to to do this action' })
    }

    return (
        <>
            <Metadata seoTitle='Users | SuperFaster' />
            <div className='flex overflow-x-auto px-4 py-4'>
                {isFetching ?
                    <div className='flex w-full flex-col'>
                        <Skeleton count={1} width={1000} height={12} />
                        <div className='flex w-full gap-2'>
                            <Skeleton count={1} width={244} height={12} />
                            <Skeleton count={1} width={244} height={12} />
                            <Skeleton count={1} width={244} height={12} />
                            <Skeleton count={1} width={244} height={12} />
                        </div>
                    </div>
                    :
                    catchedMutateData &&
                    <div className='w-full gap-1 flex flex-col'>
                        <h1>All Users Data : </h1>
                        <DisplayUser
                            handleEdit={handleEdit}
                            setIsModal={setIsModal}
                            users={catchedMutateData} />
                    </div>
                }
            </div>
            {
                (isModal.isOpen && data) &&
                <UserModal
                    values={values}
                    setValues={setValues}
                    handleEdit={handleEdit}
                    user={data.filter(user => user.id == isModal.id)[0]}
                    setIsModal={setIsModal}
                />
            }
        </>
    )
}
