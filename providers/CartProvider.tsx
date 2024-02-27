'use client'

import { CartContextProvider } from "@/hooks/useCart";
import { FC, ReactNode } from "react"

interface CartProviderProps {
    children: ReactNode
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
    return (
        <div>
            <CartContextProvider>
                {children}
            </CartContextProvider>
        </div>
    );
}

export default CartProvider;