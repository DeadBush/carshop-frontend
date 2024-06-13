"use client"

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-carts";
import { Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CartItem from "./cart-item";
import Box from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface CartContentProps{
    userId: string | null
}

const CartContent = ({userId} : CartContentProps) =>{

    const cart= useCart()

    const searchParams = useSearchParams()

    const totalPrice = cart.items.reduce((total, item) => {
        return total + Number(item.price * item.qty)
    },0)

    useEffect(()=>{
        if(searchParams.get("success")){
            toast.success("Giao dịch thành công");
            cart.removeAll();
        }
        if(searchParams.get("canceled")){
            toast.error("Có gì đó sai sai");
        }
    },[searchParams, cart.removeAll]);

    const onCheckOut = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
                {
                    product : cart.items,
                    userId
                },
            )
            window.location = response.data.url 
        } catch(err) {
            console.log('Checkout failed: ' + err)
        }
    };

    return(
        <>
            <div className="w-full flex items-center justify-between gap-4">
                <h2 className="text-3xl font-semibold text-neutral-700"></h2>
                <Button onClick={cart.removeAll} variant={"destructive"}>
                    Remove all <Trash className="w-4 h-4 ml-2"/>
                </Button>
            </div>

            <div className="w-full lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
                <div className="col-span-8">
                    {cart.items.length === 0 && (
                        <div className="w-full items-center flex justify-center">
                            <p className="text-3xl text-neutral-600 font-semibold">
                                There are no products in cart
                            </p>
                        </div>
                    )}

                    <div className="w-full space-y-4">
                        {cart.items.map(item => (
                            <CartItem item={item} key={item.id}/>
                        ))}
                    </div>
                </div>
                <div className="col-span-4 space-y-8">
                    <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
                        <h2 className="text-lg text-neutral-700 font-semibold">
                            Order Summary
                        </h2>

                        <Separator />

                        <Box className="flex-col space-y-2">
                            <div className="flex items-center justify-between w-full px-4 whitespace-nowrap text-muted-foreground">
                                <p className="text-black font-bold text-base">Total</p>
                                <p className="font-semibold text-2xl text-black">${totalPrice}</p>
                            </div>
                        </Box>
                    </Box>

                    <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
                        <h2 className="text-lg text-neutral-700 font-semibold">Payment</h2>

                        <Separator/>

                        <Button className="w-full" onClick={onCheckOut}>Checkout</Button>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default CartContent;