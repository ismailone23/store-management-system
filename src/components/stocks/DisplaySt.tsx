import { productsjointype } from '@/types'
import { InformationCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { Dispatch, FormEvent, SetStateAction } from 'react'

export default function DisplaySt({
    data,
    setIsUpModalOpen,
    handleUpdate,
    setDetail,
    handleDel
}: {
    data: productsjointype[];
    setIsUpModalOpen: Dispatch<SetStateAction<{ open: boolean; id: string }>>;
    setDetail: Dispatch<SetStateAction<{ open: boolean; id: string }>>;
    handleUpdate: (e: (FormEvent<HTMLFormElement> | null), type: 'update' | 'delete') => Promise<void>;
    handleDel: (id: string) => void
}) {

    return (
        <div className='flex flex-col w-full'>
            <h1 className='w-full text-center py-1'>All Stocks</h1>
            <div className='w-full flex flex-col sm:grid xl:grid-cols-3 lg:grid-cols-2 overflow-y-auto gap-2'>
                {
                    data.map(({ prices, products, stocks }, i) =>
                        <div key={i} className="flex w-full border gap-2 p-2 rounded">
                            <div className='flex w-40 h-32'>
                                {
                                    products.image === 'no image' ?
                                        <Image priority src={'/static/nophoto.jpeg'} alt='product image' className='w-full rounded h-full object-cover' width='0' height='0' sizes='100vw' />
                                        :
                                        <Image priority src={products.image} alt='product image' className='w-full h-full rounded object-contain' width='0' height='0' sizes='100vw' />
                                }
                            </div>
                            <div className='flex text-sm flex-col gap-1'>
                                <h1 className='line-clamp-1 text-base'>{products.productname}</h1>
                                <h1>{prices.discount ? 'Reguler Price : ' : 'MRP : '}{prices.mrp}</h1>
                                {prices.discount > 0 && <h1>Special price : {Math.round(prices.mrp - (prices.mrp * (prices.discount / 100)))}</h1>}
                                <h1>In Stock : <input type="number" className='text-center outline-none border w-12' defaultValue={stocks.totalstock} readOnly /></h1>
                                <div className="flex gap-1">
                                    <button onClick={() => setDetail({ open: true, id: products.id })}><InformationCircleIcon className='w-5 text-purple-500' /></button>
                                    <button onClick={() => setIsUpModalOpen({ id: products.id, open: true })}><PencilSquareIcon className='w-5 text-blue-500' /></button>
                                    <button onClick={() => handleDel(products.id)} ><TrashIcon className='w-5 text-red-500' /></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
