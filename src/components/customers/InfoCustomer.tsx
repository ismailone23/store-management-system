import { Customertype } from '@/server/schema'
import { customerhistory } from '@/types'
import React from 'react'

export default function InfoCustomer({ customer, setInfoCs }: {
    customer: Customertype; setInfoCs: React.Dispatch<React.SetStateAction<{
        isopen: boolean;
        id: number;
    }>>
}) {
    const jsond: customerhistory[] = JSON.parse(customer.history)

    return (
        <div className='absolute top-0 flex p-2 left-0 items-center w-full justify-center overflow-hidden h-full bg-black/35'>
            <div className='max-h-full overflow-y-auto no-scrollbar w-full max-w-[700px]'>
                <div className='w-full text-sm gap-2 p-4 flex flex-col rounded h-auto bg-white'>
                    <div><h1>Dealer id : {customer.dealerid}</h1></div>
                    <div className='flex flex-col gap-2'>
                        {jsond.length > 0 &&
                            jsond.map(({ amount, date, type }, i) => <div key={i}>
                                <h1>{i + 1}. {amount} in {type}</h1>
                                <h1>Date : {new Date(date).getDate()}-{new Date(date).getMonth() + 1}-{new Date(date).getFullYear()}</h1>
                            </div>
                            )}
                    </div>
                    <div className='justify-end w-full flex'>
                        <button onClick={() => setInfoCs({ id: 0, isopen: false })} className='px-2 py-1 rounded outline-none text-white bg-gray-700'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
