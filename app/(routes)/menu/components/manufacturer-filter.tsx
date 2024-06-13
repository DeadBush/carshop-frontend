"use client"

import Box from "@/components/ui/box";
import { cn } from "@/lib/utils";
import { Manufacturer } from "@/type-db";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

interface ManufacturersFiltersProps {
    manufacturers: Manufacturer[]
}

const ManufacturersFilters = ({manufacturers} : ManufacturersFiltersProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (manufacturer : string) => {
        const currentParams = Object.fromEntries(searchParams.entries())

        if(currentParams.manufacturer === manufacturer){
            delete currentParams.manufacturer
        }
        currentParams.manufacturer = manufacturer

        const href=qs.stringifyUrl({
            url:"/menu",
            query:currentParams
        })

        router.push(href);
    }

    return (
        <Box className="flex-col gap-2 border-b pb-4 cursor-pointer">
            <h2 className="text-xl font-semibold text-neutral-700">Manufacturers</h2> 
            <Box className="flex-col gap-2 mt-2">
                {manufacturers?.map(manufacturer=>(
                    <div onClick={()=>handleClick(manufacturer.name)} key={manufacturer.id} className={cn("text-sm font-semibold text-neutral-500 flex items-center gap-2", manufacturer.name === searchParams.get("Manufacturer") && "text-hero")}>
                    <p>{manufacturer.name} ({manufacturer.value})</p>
                    {manufacturer.name === searchParams.get("manufacturer") && (
                        <Check className="w-4 h-4 text-hero"/>
                    )}
                    </div>
                ))}
            </Box>
        </Box>
    );
}

export default ManufacturersFilters;