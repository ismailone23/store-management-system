'use client'
import Metadata from '@/components/shared/Metadata'
import CreateStModal from '@/components/stocks/CreateStModal';
import DetailsForm from '@/components/stocks/DetailsForm';
import DisplaySt from '@/components/stocks/DisplaySt';
import StockTop from '@/components/stocks/StockTop'
import UpdateStModal from '@/components/stocks/UpdateStModal';
import useMessage from '@/context/useMessage';
import { api } from '@/trpc/client';
import React, { useMemo, useRef, useState } from 'react'
import Loading from './loading';

export default function Page() {
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
    const [searchText, setSearchText] = useState<string>('')

    const catchedMutateData = useMemo(() => {
        if (isError || isFetching) return null
        return data?.filter(da => da.products.productname.toLowerCase().includes(searchText.toLowerCase()))
    }, [isFetching, data, isError, searchText]);


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

    function handleDel(id: string) {
        if (confirm('sure wants to delete ? ')) {
            productdeleteapi.mutate(id)
        }
    }
    return (
        <>
            <Metadata seoTitle='Stocks | SuperFaster' />
            <div className='w-full flex flex-col h-full overflow-hidden'>
                <div className='md:px-2 md:pt-4 sm:px-2 pb-1 pt-2 flex w-full'>
                    <StockTop setSearchText={setSearchText} setIsModalOpen={setIsModalOpen} />
                </div>
                <div className="w-full sm:px-2 h-auto no-scrollbar overflow-y-auto">
                    {isFetching ? <Loading /> : catchedMutateData && <DisplaySt handleDel={handleDel} setDetail={setDetail}
                        setIsUpModalOpen={setIsUpModalOpen} data={catchedMutateData} />}
                </div>
            </div>
            {isModalOpen && <CreateStModal formRef={formRef} createproductapi={createproductapi} setIsModalOpen={setIsModalOpen} />}
            {(isUpModalOpen.open && catchedMutateData) && <UpdateStModal productupdateapi={productupdateapi} setIsUpModalOpen={setIsUpModalOpen} upformRef={upformRef}
                isUpModelOpen={isUpModalOpen} product={catchedMutateData?.filter(d => d.products.id == isUpModalOpen.id)[0]} />}
            {(detail.id && (detail.open && catchedMutateData)) && <DetailsForm setDetail={setDetail}
                joint={catchedMutateData?.filter(d => d.products.id == detail.id)[0]} />}
        </>
    )
}
