'use client'
import {useState} from "react";
import {Input} from "@nextui-org/react";
import Image from "next/image";

export default function SearchInput() {
    const [searchText, setSearchText] = useState<string>('');
    return (

                <Input
                    type="text"
                    placeholder="Search for an article"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                    className="bg-white w-[46rem] max-w-3xl"
                    startContent={<Image src="/assets/icons/search.svg" alt="Search" width={24} height={24}/>}
                    variant="bordered"
                    endContent={
                        <>
                            <div className="border-l h-full mx-2"></div>
                            <p className="text-[#959595] text-2xl font-bold">Search</p>
                        </>
                    }
                />

    );
}