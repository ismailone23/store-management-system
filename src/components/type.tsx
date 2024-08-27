'use client'
import { api } from "@/trpc/client";

const createproductapi = api.productRouter.createProduct.useMutation()
export type createproductapitype = typeof createproductapi

const productupdateapi = api.productRouter.updateProduct.useMutation()
export type productupdateapitype = typeof productupdateapi
