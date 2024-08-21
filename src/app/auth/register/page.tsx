'use client'
import RegisterForm from '@/components/auth/register-form'
import Top from '@/components/auth/Top'
import ELink from '@/components/shared/ELink'
import useMessage from '@/context/useMessage'
import { api } from '@/trpc/client'
import { forminterface } from '@/types'
import { FormEvent, useRef } from 'react'

export default function Page() {
    const { setMessage, setIsLoading } = useMessage()
    const formref = useRef<HTMLFormElement | null>(null)
    const createUserapi = api.userRouter.createUser.useMutation({
        onSuccess: () => {
            setMessage({ error: false, text: 'User Createad. Wait for approval.' })
            formref.current?.reset();
            setIsLoading(false)
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    })
    const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true)
        const formdata = new FormData(formref.current as HTMLFormElement)
        const { c_password, email, password, name } = Object.fromEntries(formdata) as forminterface
        if (password !== c_password) {
            setIsLoading(false);
            setMessage({ error: true, text: 'password and confirm password must be same' })
            return
        }
        createUserapi.mutate({ email, name: name, password });
    }
    return (
        <div className='w-full flex items-center p-2 h-screen overflow-y-auto overflow-x-hidden justify-center'>
            <div className="w-full border gap-5 rounded border-gray-100 max-w-[400px] p-4 flex flex-col">
                <Top title='Register New User' />
                <RegisterForm formref={formref} handlesubmit={handlesubmit} />
                <ELink className='underline' href='/auth/signin' title={`Already Have an Account?`} />
            </div>
        </div>
    )
}