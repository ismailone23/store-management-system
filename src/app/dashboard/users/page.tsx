import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

export default function page() {
    const session = useSession()

    return (
        <div>
            user page
        </div>
    )
}
