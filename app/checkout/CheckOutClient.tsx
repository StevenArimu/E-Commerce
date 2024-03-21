'use client'

import { useCart } from "@/hooks/useCart";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";


const CheckOutClient = () => {
    const router = useRouter()
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    console.log("clientSecret =>", clientSecret)
    console.log("PaymentIntent", paymentIntent)


    // useEffect(() => {
    //     if (cartProducts) {
    //         setLoading(true)
    //         setError(false)

    //         fetch('api/create-payment-intent', {
    //             method: "POST",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 items: cartProducts,
    //                 payment_intent_id: paymentIntent
    //             })
    //         }).then((res) => {
    //             setLoading(false)
    //             if (res.status === 401) {
    //                 return router.push("/login")
    //             }

    //             return res.json()
    //         })
    //             .then((data) => {
    //                 setClientSecret(data.paymentIntent.client_secret)
    //                 handleSetPaymentIntent(data.paymentIntent.id)
    //             })
    //             .catch(error => {
    //                 setError(true)
    //                 console.log("ERROR=>", error)
    //                 toast.error("Something Went wrong")
    //             })
    //     }
    // }, [cartProducts, paymentIntent])

    useEffect(() => {
        //crate a paymentIntent as soon as the page loads
        if (cartProducts) {
            setLoading(true)
            setError(true)
            console.log("Current cartProducts =>",cartProducts,)
            console.log("Current PaymentIntent =>", paymentIntent)
            axios.post("/api/create-payment-intent", { items: cartProducts, payment_intent_id: paymentIntent })
                .then(res => {
                    setLoading(false)
                    if (res.status === 401) {
                        return router.push('/login')
                    }
                    return res.data
                })
                .then((data) => {
                    setClientSecret(data.paymentIntent.client_secret)
                    handleSetPaymentIntent(data.paymentIntent.id)
                })
                .catch(error => {
                    setError(true)
                    console.log("error => ", error)
                    toast.error("Something went wrong")
                })
        }
    }, [cartProducts, paymentIntent, router, handleSetPaymentIntent])


    return (
        <div >
            <h1>CheckOutClient</h1>
        </div>
    );
}

export default CheckOutClient;