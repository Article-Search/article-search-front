'use client'
import SearchInput from "@/components/SearchInput";
import Feed from "@/components/Feed";
import { useParams } from "next/navigation";
import {articles} from "@/constants";
import Image from "next/image";

export default function Page() {
    const params = useParams<{ searchValue: string}>()
    let { searchValue } = params;
    return (
        <section className="flex flex-col items-center gap-9">
                <div className="flex flex-col gap-11">
                    <SearchInput/>
                    <div className="flex justify-between items-center px-3">
                        <p className="text-xl"><b>{articles.length}</b> Results found for <b>{searchValue}</b></p>
                        <Image
                            src="/assets/icons/filter.svg"
                            alt="Filter"
                            width={53}
                            height={53}
                        />
                    </div>
                </div>
            <Feed articles={articles} searchValue={searchValue}/>
        </section>
    );
}