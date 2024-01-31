'use client'
import SearchInput from "@/components/SearchInput";
import Feed from "@/components/Feed";
import { useParams } from "next/navigation";
import {articles} from "@/constants";
import Image from "next/image";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";

export default function Page() {
    const params = useParams<{ searchValue: string}>()
    let { searchValue } = params;
    return (
        <section className="flex flex-col items-center gap-9 mt-16">
                <div className="flex flex-col gap-11">
                    <SearchInput/>
                    <div className="flex justify-between items-center px-3">
                        <p className="text-xl"><b>{articles.length}</b> Results found for <b>{searchValue}</b></p>
                        <Popover placement="bottom" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button isIconOnly aria-label="Filter" radius="full" size="lg" variant="flat" className="button-3d-effect">
                                <Image
                                    src="/assets/icons/filter.svg"
                                    alt="Filter"
                                    width={53}
                                    height={53}
                                />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-60">
                                {(titleProps) => (
                                    <div className="px-1 py-2 w-full">
                                        <p className="text-small font-bold text-foreground" {...titleProps}>
                                            Dimensions
                                        </p>
                                        <div className="mt-2 flex flex-col gap-2 w-full">
                                            <Input label="Author Name" size="sm" variant="bordered" />
                                            <Input label="Institution Name" size="sm" variant="bordered" />
                                            <Input label="Keywords" size="sm" variant="bordered" />
                                            {/*The logic will take every keyword separately, and they will be separated by spaces*/}
                                            <div >
                                                <Input label="Start Date" size="sm" variant="bordered" datatype="date" />
                                                <Input label="End Date" size="sm" variant="bordered" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            <Feed articles={articles} documentImagePath="/assets/icons/document.svg" />
        </section>
    );
}