import { productsjointype, stockhistory } from '@/types'
import React from 'react'
import Button from '../shared/Button';
import Image from 'next/image';
import { getUserById } from '@/lib/utils/actions';

export default function DetailsForm({
    joint,
    setDetail
}: {
    joint: productsjointype
    setDetail: React.Dispatch<React.SetStateAction<{
        open: boolean;
        id: string;
    }>>
}) {

    const history: stockhistory = JSON.parse(joint.stocks.history)

    return (
        <div className='absolute bg-black/35 left-0 overflow-hidden top-0 w-full h-full items-center flex justify-center p-2'>
            <div className='max-w-[450px] gap-2 w-full flex flex-col text-sm no-scrollbar max-h-full overflow-y-auto rounded bg-white p-2'>
                <h1 className='text-base w-full text-center'>Details</h1>
                <div className='flex flex-col gap-1 w-full'>
                    <h1>{joint.products.productname}</h1>
                    <h1>Purchased Price : {joint.prices.purchasedprice}</h1>
                    <h1>MRP : {joint.prices.mrp}</h1>
                    <h1>Discount Going : {joint.prices.discount}%</h1>
                    <div>
                        {
                            history.map((hs, i) => <div className='flex flex-col gap-1' key={i}>
                                <h1>{i + 1}. Added by {hs.userid}</h1>
                                <h1 className='pl-3'>Quantity {hs.quantity} piece on {new Date(hs.date).getDate() + '-' + (new Date(hs.date).getMonth() + 1) + '-' + new Date(hs.date).getFullYear()}</h1>
                            </div>
                            )
                        }
                    </div>
                    <div className='w-full h-60'>
                        {
                            joint.products.image === 'no image' ?
                                <Image priority src={'/static/nophoto.jpeg'} alt='product image' className='w-full rounded h-full object-contain' width='0' height='0' sizes='100vw' />
                                :
                                <Image priority src={joint.products.image} alt='product image' className='w-full h-full rounded object-contain' width='0' height='0' sizes='100vw' />
                        }
                    </div>
                </div>
                <div>
                    <Button type='button' onClick={() => setDetail({ id: '', open: false })} title='Close' className='py-1 bg-gray-700/70 text-white float-end px-2 rounded border' />
                </div>
            </div>
        </div>
    )
}
