import {create} from "zustand";

import {persist, createJSONStorage} from "zustand/middleware"

import { Products } from "@/type-db";
import {toast} from "react-hot-toast"

interface CartStore{
    items: Products[],
    addItem:(data:Products)=> void,
    removeItem:(id:string) => void,
    removeAll:() => void,
    updateItemQuantity:(id:string,quantity:number)=>void
}

const useCart = create(persist<CartStore>(
    (set,get)=>({
        items:[],
        addItem:(data:Products)=>{
            const currentItems = get().items;
            const existingItems = currentItems.find(item=>item.id==data.id);

            if(existingItems){
                return toast("Vật phẩm đã ở trong giỏ hàng")
            }
            set({items:[...get().items, data]})
            toast.success("Đã thêm vào giỏ hàng")
        },

        removeItem:(id:string) => {
            set({items:[...get().items.filter(item => item.id !== id)]})
            toast.success("Vật phẩm đã được xóa khỏi giỏ hàng")
        },

        removeAll:()=> set({items:[]}),
        updateItemQuantity:(id:string, qty:number)=> {
            const updatedItems = get().items.map(item=>item.id == id?{...item, qty}:item);
            set({items:updatedItems})
        },
    }),
    {name:"cart-storage", storage:createJSONStorage((   )=>localStorage)}
    )
);

export default useCart;