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