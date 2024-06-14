"use client"

import { Orders } from "@/type-db"
import OrderItem from "./order-item";
import { Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageContentProps{
    orders : Orders[];
}

const PageContent = ({orders} : PageContentProps) => {
    if (orders.length ===0) {
    return (<div className="w-full border rounded-lg border-gray-100 p-4 flex flex">
        There are no orders here...
    </div>);
    }
    return (
        <div className="w-full rounded-lg p-4 flex flex-col items-center justify-start gap-4 mt-4">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 px-4 py-2 rounded-md border border-gray-100">
                <div className="text-base font-semibold">
                    Product Image
                </div>
                <p className="text-base font-semibold">
                    Product Name
                </p>
                <p className="text-base font-semibold">Order Status</p>

                <p className="text-base font-semibold">Payment Status</p>
            </div>
            {orders.map((order)=>(
                <OrderItem key={order.id} order = {order}/>
            ))}
        </div>
    );
};

export default PageContent