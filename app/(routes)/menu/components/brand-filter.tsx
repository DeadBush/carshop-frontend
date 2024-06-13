"use client"

import Box from "@/components/ui/box";
import { cn } from "@/lib/utils";
import { Brand } from "@/type-db";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

interface BrandsFiltersProps {
    brands: Brand[]
}

const BrandsFilters = ({brands} : BrandsFiltersProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (brand : string) => {
        const currentParams = Object.fromEntries(searchParams.entries())

        if(currentParams.brand === brand){
            delete currentParams.brand
        }
        currentParams.brand = brand

        const href=qs.stringifyUrl({
            url:"/menu",
            query:currentParams
        })

        router.push(href);
    }

    return (
        <Box className="flex-col gap-2 border-b pb-4 cursor-pointer">
            <h2 className="text-xl font-semibold text-neutral-700">Brands</h2> 
            <Box className="flex-col gap-2 mt-2">
                {brands?.map(brand=>(
                    <div onClick={()=>handleClick(brand.name)} key={brand.id} className={cn("text-sm font-semibold text-neutral-500 flex items-center gap-2", brand.name === searchParams.get("Brand") && "text-hero")}>
                    <p>{brand.name} ({brand.value})</p>
                    {brand.name === searchParams.get("brand") && (
                        <Check className="w-4 h-4 text-hero"/>
                    )}
                    </div>
                ))}
            </Box>
        </Box>
    );
}

export default BrandsFilters;