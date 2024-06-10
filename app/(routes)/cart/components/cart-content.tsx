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
        const response  = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
            {
                product : cart.items,
                userId
            }
        )

        window.location = response.data.url; 
    };

    return(
        <>
            <div className="w-full flex items-center justify-between gap-4">
                <h2 className="text-3xl font-semibold text-neutral-700"></h2>
                <Button onClick={cart.removeAll} variant={"destructive"}>
                    Xóa tất cả <Trash className="w-4 h-4 ml-2"/>
                </Button>
            </div>

            <div className="w-full lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
                <div className="col-span-8">
                    {cart.items.length === 0 && (
                        <div className="w-full items-center flex justify-center">
                            <p className="text-3xl text-neutral-600 font-semibold">
                                Chưa thêm vật phẩm nào vào giỏ hàng
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
                            Tóm tắt đơn hàng
                        </h2>

                        <Separator />

                        <Box className="flex-col space-y-2">
                            <div className="flex items-center justify-between w-full px-4 whitespace-nowrap text-muted-foreground">
                                <p className="text-black font-bold text-base">Tổng cộng</p>
                                <p className="font-semibold text-2xl text-black">${totalPrice}</p>
                            </div>
                        </Box>
                    </Box>

                    <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
                        <h2 className="text-lg text-neutral-700 font-semibold">Thanh toán</h2>

                        <Separator/>

                        <Button className="w-full" onClick={onCheckOut}>Thanh toán</Button>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default CartContent;