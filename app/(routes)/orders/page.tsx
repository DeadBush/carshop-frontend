import getOrders from "@/actions/get-orders";
import Box from "@/components/ui/box";
import Container from "@/components/ui/container";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import PageContent from "../menu/components/page-content";

const OrdersPage =  async() =>{

    const orders = await getOrders();
    const{userId}= auth();

    const formattedOrders = orders.filter(item => item.userId === userId);
    return <Container className="px-4 md:px-12 my-12 bg-white py-12 min-h-[80vh]">
        <Box className="text-neutral-700 text-sm items-center">
            <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5"/> Trang chủ
            </Link>

            <ChevronRight className="w-5 h-5 text-muted-foreground"/>
            <p className="flex items-center gap-2 text-muted-foreground">
                Đơn hàng của tôi
            </p>
        </Box>
        <h2 className="my-4 text-xl font-semibold text-neutral-700"> Đơn hàng của tôi</h2>

        <PageContent/>
    </Container>
};

export default OrdersPage;