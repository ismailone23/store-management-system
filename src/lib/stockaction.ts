import { stockformtype } from "@/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Session } from "next-auth";
import { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { storage } from '@/firebase';
import { messageType } from "@/context/useMessage";
import { createproductapitype, productupdateapitype } from "@/components/type";

async function getURL(image: File) {
    const imageblob = URL.createObjectURL(image)
    const newImageRef = ref(storage, imageblob);
    await uploadBytesResumable(newImageRef, image);
    return await getDownloadURL(newImageRef);
}

export const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    setMessage: Dispatch<SetStateAction<messageType>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    formRef: RefObject<HTMLFormElement | null>,
    session: Session | null,
    createproductapi: createproductapitype
) => {
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    const formdata = new FormData(formRef.current as HTMLFormElement)
    const { discount, mrp, productname, purchasedprice, totalstock, image } = Object.fromEntries(formdata) as stockformtype;
    if (Number(discount) > 100) {
        setIsLoading(false)
        return setMessage({ error: true, text: 'discount cant be more than 100' })
    }
    if (!image || image.size < 1) {
        return createproductapi.mutate({
            discount: Number(discount),
            mrp: Number(mrp),
            productname,
            purchasedprice: Number(purchasedprice),
            totalstock: Number(totalstock),
            userid: session?.user.email
        })
    }
    const imgUrl = await getURL(image)
    return createproductapi.mutate({
        discount: Number(discount),
        mrp: Number(mrp),
        image: imgUrl,
        productname,
        purchasedprice: Number(purchasedprice),
        totalstock: Number(totalstock),
        userid: session?.user.email
    })
}
export const handleUpdate = async (
    e: FormEvent<HTMLFormElement>,
    setMessage: Dispatch<SetStateAction<messageType>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    upformRef: RefObject<HTMLFormElement | null>,
    session: Session | null,
    isUpModalOpen: { id: string, open: boolean },
    productupdateapi: productupdateapitype
) => {
    setIsLoading(true)
    e.preventDefault();
    const formdata = new FormData(upformRef.current as HTMLFormElement)
    const { discount, mrp, productname, purchasedprice, totalstock, image } = Object.fromEntries(formdata) as stockformtype;
    if (Number(discount) > 100) {
        setIsLoading(false)
        return setMessage({ error: true, text: 'discount cant be more than 100' })
    }
    if (!image || image.size < 1) {
        return productupdateapi.mutate({
            id: isUpModalOpen.id,
            discount: Number(discount),
            mrp: Number(mrp),
            productname,
            purchasedprice: Number(purchasedprice),
            stock: Number(totalstock),
            userid: session?.user.email
        })
    }
    const imgUrl = await getURL(image)

    return productupdateapi.mutate({
        id: isUpModalOpen.id,
        discount: Number(discount),
        mrp: Number(mrp),
        image: imgUrl,
        productname,
        purchasedprice: Number(purchasedprice),
        stock: Number(totalstock),
        userid: session?.user.email
    })

}