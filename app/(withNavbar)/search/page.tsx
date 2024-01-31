"use client"
import NavigationBar from "@/components/navigationBar";
import {Button} from "@nextui-org/react";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import Hello from "@/components/Hello";
import isAuth from "@/components/isAuth";


function Page() {

    return (
        <>
            <main className="w-full h-screen flex flex-col items-center mt-10">
                <Hello />
                <div className="mt-16"><SearchInput/></div>
            </main>
        </>
    );
}

export default isAuth(Page,3);