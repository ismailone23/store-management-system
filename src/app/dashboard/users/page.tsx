'use client'
import Metadata from '@/components/shared/Metadata'
import DisplayUser from '@/components/users/displayuser'
import { api } from '@/trpc/client'
import React, { useMemo } from 'react'

export default function page() {
    const { data, isError, isFetching } = api.userRouter.getUsers.useQuery()
    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        return data
    }, [isFetching, data, isError])

    return (
        <>
            <Metadata seoTitle='Users | SuperFaster' />
            <div className='flex overflow-x-auto'>
                {isFetching ? 'fetching' :
                    catchedMutateData && <DisplayUser users={catchedMutateData} />
                }
            </div>
        </>
    )
}
