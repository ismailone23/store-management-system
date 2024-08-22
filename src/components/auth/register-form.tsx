'use client'
import { FormEvent, MutableRefObject } from 'react'
import Input from '../shared/Input'
import Button from '../shared/Button'
import ErrorDiv from '../shared/ErrorDiv'
import useMessage from '@/context/useMessage';

export default function RegisterForm({
    formref,
    handlesubmit
}: {
    formref: MutableRefObject<HTMLFormElement | null>;
    handlesubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
    const { message, isLoading } = useMessage();

    return (
        <form ref={formref} onSubmit={handlesubmit} className='flex flex-col gap-2'>
            <Input
                title='User Name'
                name='name'
                type='text'
                placeholder='John Doe'
            />
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
            <Input
                title='Confirm Password'
                name='c_password'
                type='password'
                placeholder='******'
            />
            <Button
                disabled={isLoading}
                className='bg-gray-800 disabled:bg-gray-700 py-1 rounded-sm text-white'
                title='Register'
                type='submit'
            />
            {message && <ErrorDiv />}
        </form>
    )
}
