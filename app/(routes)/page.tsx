import getProducts from "@/actions/get-products";
import  Container  from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PopularContent } from "@/components/ui/popular-content";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Car, Shield, Truck } from "lucide-react";

export const revalidate = 0;

const HomePage = async () =>{
    const products =  await getProducts({isFeatured: true});
    return (
        <>
        <Container className="px-4 md:px-12">
            <section className="grid grid-cols-1 md:grid-cols-2 py-12 pt-16">
                <div className="flex flex-col items-start justify-start gap-4">
                    <p className="px-6 py-1 rounded-full text-neutral-500 border boder-gray-300">Want to buy a new car?</p>
                
                    <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">
                        Visit our <span className="block py-4">BugCar now!</span>
                        </h2>
                        <p className="text-base text-center md:text-left text-neutral-500 my-4">
                        Welcome to Online Car Shop, which brings you the ultimate car shopping experience. We are proud to be a reputable dealer, providing a variety of car models from the world&apos;s leading brands. With a team of professional and experienced staff, we are committed to providing customers with dedicated advice and excellent after-sales service. Whether you are looking for a comfortable family car, a powerful SUV or a classy luxury vehicle, we can meet all your needs. Come to Online Car Shop to experience and choose your dream car today!
                    </p>

                    <div className="my-4 flex text-center justify-center gap-6 w-full md:w-auto">
                        <Link href={"/menu"}>
                            <Button className="px-8 md:px-16 py-4 md:py-6 rounded-full bg-hero">Order now!</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button className="px-8 md:px-16 py-4 md:py-6 rounded-full"variant="outline">Explore more</Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="w-full relative h-[560px] flex items-center justify-center">
                        <Image
                            src="/img/car1.png"
                            alt="graphic"
                            className="object-contain w-full h-full absolute"
                            fill
                        />
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 gap-y-20 md:gap-12 my-4 py-12">
                {
                    products?.slice(0,4).map(item =>(
                        <PopularContent key={item.id} data={item}/>
                    ))
                }
            </section>

            <section className="my-4 py-12 flex flex-col items-center justify-center">
                <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">Why you need to shopping in our store ?</h2>
                <p>
                Buying a car at our store ensures you receive dedicated service and professional support from our experienced staff. We provide high quality vehicles from reputable brands with competitive prices and preferential warranties. Come to us for the easiest and most reliable car shopping experience!   
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 mt-20">
                    <Card className="shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
                        <Car className="w-8 h-8 text-hero"/>
                        <CardTitle className="text-neutral-600">
                            Genuine Car
                        </CardTitle>
                        <CardDescription className="text-center">
                            Our store provides you with lots of genuine cars over the world
                        </CardDescription>
                    </Card>

                    <Card className="shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
                        <Shield className="w-8 h-8 text-hero"/>
                        <CardTitle className="text-neutral-600">
                            Lifetime Warranty
                        </CardTitle>
                        <CardDescription className="text-center">
                            Lifetime warranty support for every payment
                        </CardDescription>
                    </Card>

                    <Card className="shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
                        <Truck className="w-8 h-8 text-hero"/>
                        <CardTitle className="text-neutral-600">
                            Fast Delivery
                        </CardTitle>
                        <CardDescription className="text-center">
                            Fast delivery service for online payment
                        </CardDescription>
                    </Card>
                </div>
            </section>

            <section className="my-4 py-12 flex flex-col items-center justify-center">
            <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-neutral-700 my-4">FEATURED BRANDS</h2>
                <p>Some outstanding brands of the store</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 mt-20">
                    <Card className="shadow-lg relative  rounded-md border-none flex flex-col items-center justify-end h-96 md:h[520px] bg-hero/30">
                        <Image  src={"/img/car1.png"} alt="Car One" className="w-full h-full object-contain" fill/>
                    </Card>

                    <Card className="shadow-lg relative  rounded-md border-none flex flex-col items-center justify-end h-96 md:h[520px] bg-hero/30">
                        <Image  src={"/img/car2.png"} alt="Car Two" className="w-full h-full object-contain" fill/>
                    </Card>

                    <Card className="shadow-lg relative  rounded-md border-none flex flex-col items-center justify-end h-96 md:h[520px] bg-hero/30">
                        <Image  src={"/img/car3.png"} alt="Car Three" className="w-full h-full object-contain" fill/>
                    </Card>
                </div>
            </section>
        </Container>
        </>
    )
}

export default HomePage;