'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Page() {
    const session = useSession();
    return (
        <div>
            <div>
                {JSON.stringify(session)}
            </div>
            <button onClick={() => signOut()} >signout</button>
        </div>
    )
}
