'use client'
import {useState} from "react";
import {Button, Input, Link} from "@nextui-org/react";
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
                            <Link href={`/search/${searchText}`}><Button className={` bg-white text-2xl font-bold ${searchText ? 'text-green-500' : 'text-[#959595]'} transition`}>Search</Button></Link>
                        </>
                    }
                />

    );
}