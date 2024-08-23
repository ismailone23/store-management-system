'use client'
import SignInForm from '@/components/auth/sign-inform'
import Top from '@/components/auth/Top'
import ELink from '@/components/shared/ELink'
import Metadata from '@/components/shared/Metadata'
import useMessage from '@/context/useMessage'
import { getUserByEmail } from '@/lib/utils/actions'
import { logintype } from '@/types'
import { compare } from 'bcryptjs'
import { signIn } from 'next-auth/react'
import { FormEvent, useRef } from 'react'

export default function Page() {
    const { setMessage, setIsLoading } = useMessage();
    const formref = useRef<HTMLFormElement | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null)
        setIsLoading(true)
        setIsLoading(false)
        const formdata = new FormData(formref.current as HTMLFormElement)
        const { email, password } = Object.fromEntries(formdata) as logintype
        if (!email || !password) {
            setIsLoading(false)
            setMessage({ error: true, text: "Fill all the fields carefully" })
            return
        } else if (password.length < 6) {
            setIsLoading(false)
            setMessage({ error: true, text: "password must be greater than 6 charecter" })
            return
        }
        const user = await getUserByEmail(email)
        if (!user) {
            setIsLoading(false)
            setMessage({ error: true, text: "Invalid Credentials" })
            return
        }
        const passcheck = await compare(password, user.password)
        if (!passcheck) {
            setIsLoading(false)
            setMessage({ error: true, text: "Invalid Credentials" })
            return
        }
        if (!user.isapproved) {
            setIsLoading(false)
            setMessage({ error: true, text: "Your account is not approved yet" })
            return
        }
        await signIn('credentials', { ...user }).then(() => {
            setIsLoading(false)
            formref.current?.reset()
        }).catch((error) => {
            setIsLoading(false)
            setMessage({ error: true, text: error })
        })
    }
    return (
        <>
            <Metadata seoTitle='Signin | SuperFaster' />
            <div className='w-full flex items-center p-2 h-screen overflow-y-auto overflow-x-hidden justify-center'>
                <div className="w-full border gap-5 rounded border-gray-100 max-w-[400px] p-4 flex flex-col">
                    <Top title='SigIn Option' />
                    <SignInForm formref={formref} handleSubmit={handleSubmit} />
                    <ELink isActivelink={false} className='underline' href='/auth/register' title={`Don't Have an Account?`} />
                </div>
            </div>
        </>
    )
}