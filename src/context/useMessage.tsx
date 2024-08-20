'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useReducer, useState } from 'react'

type messageType = {
    error: boolean;
    text: string;
} | null
export type messageContextType = {
    isLoading: boolean;
    message: messageType;
    setMessage: Dispatch<SetStateAction<messageType>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const MessageContext = createContext<messageContextType | null>(null)

export function MessageContextProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<messageType>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const contextValue = {
        message,
        isLoading,
        setIsLoading,
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