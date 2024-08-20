'use client'
import Button from '@/components/shared/Button'
import ELink from '@/components/shared/ELink'
import ErrorDiv from '@/components/shared/ErrorDiv'
import Input from '@/components/shared/Input'
import useMessage from '@/context/useMessage'

export default function Page() {
    const { message } = useMessage()
    return (
        <div className='w-full flex items-center p-2 h-screen overflow-y-auto overflow-x-hidden justify-center'>
            <div className="w-full border gap-5 rounded border-gray-100 max-w-[450px] py-4 px-2 flex flex-col">
                <h1 className='text-center'>Register New User</h1>
                <form className='flex flex-col gap-2'>
                    <Input
                        title='User Name'
                        name='user_name'
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
                        name='confirm_password'
                        type='password'
                        placeholder='******'
                    />
                    <Button
                        className='bg-gray-800 py-1 rounded-sm text-white'
                        title='Register'
                        type='submit'
                    />
                    {message && <ErrorDiv />}
                </form>
                <ELink className='underline' href='/auth/signin' title={`Already Have an Account?`} />
            </div>
        </div>
    )
}