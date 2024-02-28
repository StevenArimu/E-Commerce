'use client'

import { CartContextProvider } from "@/hooks/useCart";
import { FC, ReactNode } from "react"

interface CartProviderProps {
    children: ReactNode
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
    return (
        <CartContextProvider>
            {children}
        </CartContextProvider>
    );
}

export default CartProvider;