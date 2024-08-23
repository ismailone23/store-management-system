'use client'

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Metadata from "@/components/shared/Metadata";
import useMessage from "@/context/useMessage";
import { api } from "@/trpc/client";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import { FormEvent, useRef } from "react";

export default function Page() {
    const { data, update } = useSession();
    const { setIsLoading, isLoading, setMessage } = useMessage();
    const user = data?.user
    const formref = useRef<HTMLFormElement>(null)
    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };
    const updateuserapi = api.userRouter.updateUser.useMutation({
        onSuccess(data) {
            setMessage({ error: false, text: 'user updated' })
            setIsLoading(false)
            reloadSession();
            const upus = data[0]
            update({ ...upus });

        },
        onError({ message }) {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    })
    const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault();
        setMessage(null)
        const formdata = new FormData(formref.current as HTMLFormElement)
        const { email, name, password } = Object.fromEntries(formdata) as { email: string; password: string; name: string }
        if ((user.email === email && user.name === name) && !password) return
        if (!password) return updateuserapi.mutate({ id: user.id, name, email })
        updateuserapi.mutate({ id: user.id, name, email, password })
    }
    return (
        <>
            <Metadata seoTitle='LogedIn Users Settings | SuperFaster' />
            <div className='w-full items-center flex justify-center flex-col'>
                <div className='max-w-[400px] gap-2 w-full flex flex-col'>
                    <div className='w-full flex items-center flex-col'>
                        <div className='w-20 h-20 rounded-full border flex items-center justify-center'>
                            <UserIcon className='w-20' />
                        </div>
                    </div>
                    <form onSubmit={handlesubmit} ref={formref} className='w-full flex gap-1 flex-col'>
                        <Input required name='name' value={user.name} placeholder={user.name} title='Username' type='text' />
                        <Input required name='email' value={user.email} placeholder={user.email} title='Email' type='email' />
                        <Input name='password' placeholder='******' title='Password' type='password' />
                        <div className='w-full'>
                            <Button disabled={isLoading} type='submit' className='py-1 float-right px-2 bg-blue-500 text-white rounded-sm' title='Update' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
