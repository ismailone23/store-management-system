'use client'
import { FormEvent, MutableRefObject } from 'react'
import Input from '../shared/Input'
import ErrorDiv from '../shared/ErrorDiv'
import Button from '../shared/Button'
import useMessage from '@/context/useMessage'

export default function SignInForm({
    formref,
    handleSubmit
}: {
    formref: MutableRefObject<HTMLFormElement | null>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}) {
    const { message, isLoading } = useMessage();

    return (
        <form ref={formref} onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <Input
                title='Email'
                name='email'
                type='email'
                placeholder='test@example.com'
            />
            <Input
                title='Password'
                name='password'
                type='password'
                placeholder='******'
            />
            <Button
                disabled={isLoading}
                className='bg-sky-500 disabled:bg-blue-300 py-1 rounded-sm text-white'
                title='Sign In'
                type='submit'
            />
            {message && <ErrorDiv />}
        </form>
    )
}
