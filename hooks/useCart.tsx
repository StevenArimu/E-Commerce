// import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { CartProductType } from "@/types";
import { createContext, useState, useContext, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null,
    paymentIntent: string | null,
    handleAddProductToCart: (product: CartProductType) => void,
    handleRemoveProductFromCart: (product: CartProductType) => void,
    handelCartQtyIncrease: (product: CartProductType) => void,
    handelCartQtyDecrease: (product: CartProductType) => void,
    handleClearCart: () => void,
    handleSetPaymentIntent: (value: string | null) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

        setCartProducts(cProducts)
        setPaymentIntent(paymentIntent)
    }, [])

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity
                        acc.total += itemTotal
                        acc.qty += item.quantity
                        return acc
                    }, {
                    total: 0,
                    qty: 0
                }
                );
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        };
        getTotals()
    }, [cartProducts])


    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Product added to cart')
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            setCartProducts(filteredProducts)
            toast.success('Product removed')
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
        }
    }, [cartProducts])

    const handelCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 99) {
            return toast.error("Oops! Maximum reached")
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCarItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])



    const handelCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 1) {
            return toast.error("Oops! Minimum reached")
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCarItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.removeItem('eShopCarItems')
    }, [])


    const handleSetPaymentIntent = useCallback((value: string | null) => {
        setPaymentIntent(value)
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(value))
    }, [paymentIntent])


    const value = {
        cartTotalAmount,
        paymentIntent,
        cartProducts,
        cartTotalQty,
        handleClearCart,
        handelCartQtyIncrease,
        handelCartQtyDecrease,
        handleAddProductToCart,
        handleSetPaymentIntent,
        handleRemoveProductFromCart,
    };

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context
}