import Image from 'next/image'
// use the authcontext provider
import { AuthProvider } from "@/app/Context/authContext";
import NavigationBar from "@/components/navigationBar";
import { Button } from "@nextui-org/react";
import Link from 'next/link';

export default function Home() {
    return (
        <AuthProvider>
            {/*nothing*/}
            <main className="w-full h-screen flex flex-col items-center mt-10">
                <h1 className="head_text text-center">
                    Discover & Learn with
                    <br className="max-md:hidden" />
                    <span className="purple_gradient text-center"> Article-Search</span>
                </h1>
                <p className="desc text-center">
                    a platform that will allow you to search and
                    read the latest published research articles
                </p>
                <div className="button-container flex items-center justify-center gap-40 max-md:gap-10 max-md:flex-col mt-12 pb-2">

                    <Link href='/signup'>
                        <Button className="bg-black shadow-buttons" size="lg" startContent={
                            <Image
                                src="/assets/icons/arrow.svg"
                                alt="Arrow"
                                width={20}
                                height={20}
                            />
                        }>
                            <p className="text-sm font-bold text-white">Start for free</p>
                        </Button>
                    </Link>
                    <Button className="bg-white shadow-buttons" size="lg" href="/search" startContent={
                        <Image
                            src="/assets/icons/github.svg"
                            alt="Arrow"
                            width={20}
                            height={20}
                        />
                    }>
                        <p className="text-sm font-bold text-black">Github repos</p>
                    </Button>
                </div>
            </main>
        </AuthProvider>
    )
}
