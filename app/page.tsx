import Image from 'next/image'
// use the authcontext provider
import {AuthProvider} from "@/app//Context/authContext";
import NavigationBar from "@/components/navigationBar";
import {Button} from "@nextui-org/react";

export default function Home() {

    return (

        <AuthProvider>
            {/*nothing*/}
                <NavigationBar/>
            <main className="w-full h-screen flex flex-col items-center justify-center">
                <h1 className="head_text text-center">
                    Discover & Learn with
                    <br className="max-md:hidden"/>
                    <span className="purple_gradient text-center"> Article-Search</span>
                </h1>
                <p className="desc text-center">
                    a platform that will allow you to search and
                    read the latest published research articles
                </p>
                <div className="button-container flex items-center justify-center gap-40 mt-5 pb-2">
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
                    <Button className="bg-white drop-shadow-2xl" size="lg" startContent={
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
