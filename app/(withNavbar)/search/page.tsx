import NavigationBar from "@/components/navigationBar";
import {Button} from "@nextui-org/react";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";

export default function Page() {
    return (
        <>
            <main className="w-full h-screen flex flex-col items-center mt-10">
                <h1 className="head_text text-center">
                    Discover & Learn with
                    <br className="max-md:hidden"/>
                    <span className="purple_gradient text-center"> Article-Search</span>
                </h1>
                <SearchInput />
            </main>
        </>
    );
}