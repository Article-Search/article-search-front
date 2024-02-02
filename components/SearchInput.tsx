'use client'
import {useState} from "react";
import {Button, Input, Link} from "@nextui-org/react";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function SearchInput() {
    const [searchText, setSearchText] = useState<string>('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        //add validation for all fields before submitting
        if (!searchText) {
            //add a pop message
            return;
        }
        //redirect to search page
        router.push(`/search/${searchText}`);
    }

    return (
        <form onSubmit={handleSearch}>
            <Input
                type="text"
                placeholder="Search for an article"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
                className="bg-white w-[46rem] max-w-3xl"
                startContent={<Image src="/assets/icons/search.svg" alt="Search" width={24} height={24} />}
                variant="bordered"
                endContent={
                    <>
                        <div className="border-l h-full mx-2"></div>
                        <Link href={`/search/${searchText}`}><Button className={` bg-white text-2xl font-bold ${searchText ? 'text-green-500' : 'text-[#959595]'} transition`}>Search</Button></Link>
                    </>
                }
            />
        </form>

    );
}
