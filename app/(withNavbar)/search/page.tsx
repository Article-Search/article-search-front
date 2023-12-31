import NavigationBar from "@/components/navigationBar";
import {Button} from "@nextui-org/react";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import Hello from "@/components/Hello";


export default function Page() {

    return (
        <>
            <main className="w-full h-screen flex flex-col items-center mt-10">
                <Hello />
                <div className="mt-20"><SearchInput/></div>
            </main>
        </>
    );
}