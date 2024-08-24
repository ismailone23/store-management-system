'use client'
import Metadata from '@/components/shared/Metadata'
import CreateStModal from '@/components/stocks/CreateStModal';
import DetailsForm from '@/components/stocks/DetailsForm';
import DisplaySt from '@/components/stocks/DisplaySt';
import StockTop from '@/components/stocks/StockTop'
import UpdateStModal from '@/components/stocks/UpdateStModal';
import useMessage from '@/context/useMessage';
import { storage } from '@/firebase';
import { api } from '@/trpc/client';
import { stockformtype } from '@/types';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useMemo, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
export default function Page() {
    const session = useSession();
    const { setIsLoading, setMessage } = useMessage()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [detail, setDetail] = useState<{ open: boolean, id: string }>({ open: false, id: '' });
    const [isUpModalOpen, setIsUpModalOpen] = useState<{ open: boolean, id: string }>({ open: false, id: '' });
    const upformRef = useRef<HTMLFormElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const productapi = api.productRouter.getProdcts.useQuery();
    const productdeleteapi = api.productRouter.deleteProduct.useMutation({
        onSuccess: () => {
            setMessage({ error: true, text: 'Product Deleted' })
            setIsLoading(false)
            productapi.refetch();
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    const productupdateapi = api.productRouter.updateProduct.useMutation({
        onSuccess: () => {
            setMessage({ error: false, text: 'Product Updated.' })
            upformRef.current?.reset();
            setIsLoading(false)
            productapi.refetch();
            setIsUpModalOpen({ id: '', open: false })
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });
    const { isError, isFetching, data } = productapi


    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        return data
    }, [isFetching, data, isError]);


    const createproductapi = api.productRouter.createProduct.useMutation({
        onSuccess: () => {
            setMessage({ error: false, text: 'Product has Createad.' })
            formRef.current?.reset();
            setIsLoading(false)
            productapi.refetch();
        },
        onError: ({ message }) => {
            setIsLoading(false)
            setMessage({ error: true, text: message })
        }
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
        const formdata = new FormData(formRef.current as HTMLFormElement)
        const { discount, mrp, productname, purchasedprice, totalstock, image } = Object.fromEntries(formdata) as stockformtype;
        if (!image || image.size < 1) {
            return createproductapi.mutate({
                discount: Number(discount),
                mrp: Number(mrp),
                productname,
                purchasedprice: Number(purchasedprice),
                totalstock: Number(totalstock),
                userid: session.data?.user.email
            })
        }
        const imageblob = URL.createObjectURL(image)
        const newImageRef = ref(storage, imageblob);
        await uploadBytesResumable(newImageRef, image);
        const imgUrl = await getDownloadURL(newImageRef);
        return createproductapi.mutate({
            discount: Number(discount),
            mrp: Number(mrp),
            image: imgUrl,
            productname,
            purchasedprice: Number(purchasedprice),
            totalstock: Number(totalstock),
            userid: session.data?.user.email
        })
    }
    const handleUpdate = async (e: (FormEvent | null), type: 'delete' | 'update') => {
        setIsLoading(true)
        if (e && type === 'update') {
            e.preventDefault();
            const formdata = new FormData(upformRef.current as HTMLFormElement)
            const { discount, mrp, productname, purchasedprice, totalstock, image } = Object.fromEntries(formdata) as stockformtype;
            if (!image || image.size < 1) {
                console.log('here 01');
                return productupdateapi.mutate({
                    id: isUpModalOpen.id,
                    discount: Number(discount),
                    mrp: Number(mrp),
                    productname,
                    purchasedprice: Number(purchasedprice),
                    stock: Number(totalstock),
                    userid: session.data?.user.email
                })
            }
            console.log('here 101');
            const imageblob = URL.createObjectURL(image)
            const newImageRef = ref(storage, imageblob);
            await uploadBytesResumable(newImageRef, image);
            const imgUrl = await getDownloadURL(newImageRef);
            console.log(imgUrl);

            return productupdateapi.mutate({
                id: isUpModalOpen.id,
                discount: Number(discount),
                mrp: Number(mrp),
                image: imgUrl,
                productname,
                purchasedprice: Number(purchasedprice),
                stock: Number(totalstock),
                userid: session.data?.user.email
            })

        } else {
            console.log('mutating');

            productdeleteapi.mutate(isUpModalOpen.id)
        }
    }
    return (
        <>
            <Metadata seoTitle='Stocks | SuperFaster' />
            <div className='w-full flex flex-col h-full overflow-hidden'>
                <div className='md:px-4 md:pt-4 sm:px-2 pb-1 pt-2 flex w-full'>
                    <StockTop setIsModalOpen={setIsModalOpen} />
                </div>
                <h1 className='w-full text-center py-1'>All Stocks</h1>
                <div className="w-full sm:px-4 h-auto no-scrollbar overflow-y-auto">
                    {isFetching ? <div className='grid xl:grid-cols-3 md:grid-cols-2 w-full'>
                        <Skeleton count={1} width={350} height={120} />
                        <Skeleton count={1} width={350} height={120} />
                        <Skeleton count={1} width={350} height={120} />
                    </div> : catchedMutateData && <DisplaySt setDetail={setDetail} setIsUpModalOpen={setIsUpModalOpen} handleUpdate={handleUpdate} data={catchedMutateData} />}
                </div>
            </div>
            {isModalOpen && <CreateStModal formRef={formRef} handleSubmit={handleSubmit} setIsModalOpen={setIsModalOpen} />}
            {(isUpModalOpen.open && catchedMutateData) && <UpdateStModal setIsUpModalOpen={setIsUpModalOpen} upformRef={upformRef}
                handleUpdate={handleUpdate} product={catchedMutateData?.filter(d => d.products.id == isUpModalOpen.id)[0]} />}
            {(detail.id && (detail.open && catchedMutateData)) && <DetailsForm setDetail={setDetail} joint={catchedMutateData?.filter(d => d.products.id == detail.id)[0]} />}
        </>
    )
}
