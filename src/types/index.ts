import { PriceTableType, ProductTableType, StocksTableType } from "@/server/schema";

export type logintype = {
    email: string;
    password: string;
}
export type forminterface = {
    name: string;
    password: string;
    email: string;
    c_password: string
}

export type roletype = 'ADMIN' | 'OWNER' | 'BASIC'

export type stockformtype = {
    productname: string;
    purchasedprice: string;
    mrp: string;
    discount: string;
    totalstock: string;
    image?: File;
}
export type stockhistory = {
    quantity: number;
    date: Date;
    userid: string;
}[]

export type productsjointype = {
    products: ProductTableType,
    prices: PriceTableType,
    stocks: StocksTableType
}

export type purchasedlist = {
    productid: string;
    quantity: number;
    mrp: number;
}
export type customerhistory = {
    date: Date;
    amount: number,
    type: 'debit' | 'credit'
}
