'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useReducer, useState } from 'react'

export type messageType = {
    error: boolean;
    text: string;
} | null
export type messageContextType = {
    pageLoading: boolean;
    isLoading: boolean;
    message: messageType;
    setMessage: Dispatch<SetStateAction<messageType>>;
    setPageLoading: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const MessageContext = createContext<messageContextType | null>(null)

export function MessageContextProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<messageType>(null)
    const [pageLoading, setPageLoading] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(false);
    const contextValue = {
        message,
        pageLoading,
        isLoading,
        setIsLoading,
        setPageLoading,
        setMessage
    }
    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    )
}
export default function useMessage() {
    const context = useContext(MessageContext)
    if (!context) throw new Error("Context not Working")
    return context
}