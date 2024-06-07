import { Products } from "@/type-db";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query{
    size?: string;
    isFeatured?: boolean;
    manufacturer?: string;
    category?: string;
    brand?: string;
}

const getProducts = async (query: Query) : Promise<Products[]> =>{
    const url = qs.stringifyUrl({
        url : URL,
        query : {
            size: query.size,
            isFeatured: query.isFeatured,
            manufacturer: query.manufacturer,
            category: query.category,
            brand: query.brand,
        }
    })

    const res = await fetch(url);

    return res.json();  
}

export default getProducts;