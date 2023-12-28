'use client'
import SearchInput from "@/components/SearchInput";
import Feed from "@/components/Feed";
import { useParams } from "next/navigation";
import {articles} from "@/constants";

export default function Page() {
    const params = useParams<{ searchValue: string}>()
    let { searchValue } = params;
    return (
        <section className="flex flex-col">
            <SearchInput />
            <Feed articles={articles} searchValue={searchValue}/>
        </section>
    );
}