'use client'
import SearchInput from "@/components/SearchInput";
import Feed from "@/components/Feed";
import { useParams } from "next/navigation";
import {articles} from "@/constants";
import Image from "next/image";
import {Popover, PopoverTrigger, PopoverContent, Button, Input, Select, SelectItem} from "@nextui-org/react";
import isAuth from "@/components/isAuth";
import { useEffect, useState } from "react";
import { Article } from "@/types";
const API_URL = process.env.API_URL || 'http://localhost:8000';


function Page() {
    const params = useParams<{ searchValue: string}>()
    let { searchValue } = params;
    const accessToken = localStorage.getItem('accessToken');


    const [articleList, setArticleList] = useState<Article[]>(articles);
    const [authors, setAuthors] = useState('');
    const [institutions, setInstitutions] = useState('');
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('authors');

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthors(e.target.value);
    };

    const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstitutions(e.target.value);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleApplyFilter = () => {
        let endpoint = '';
        if(selectedFilter === 'authors') {
            endpoint=`${API_URL}/articles/?search=${searchValue}&author_first_name=${authors}`;
        }else if(selectedFilter === 'institutions') {
            endpoint=`${API_URL}/articles/?search=${searchValue}&institution=${institutions}`;
        }else if(selectedFilter === 'keywords') {
            endpoint=`${API_URL}/articles/?search=${searchValue}&keyword=${keywords}`;
        }else if(selectedFilter === 'date') {
            endpoint=`${API_URL}/articles/?publish_date__gte=${startDate}&publish_date__lte=${endDate}`;
        }
        const fetchArticles = async () => {
            // const res = await fetch(endpoint);
            // add authrisation header
            const res = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const data = await res.json();
            setArticleList(data);
        }
        fetchArticles();
    };


    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch(`${API_URL}/articles/?search=${searchValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            setArticleList(data);
        }
        fetchArticles();
    }, [searchValue])

    
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
                                            <Select 
                                                label="Select a field to filter by" 
                                                className="max-w-xs" 
                                                value={selectedFilter}
                                                onChange={(e) =>{ setSelectedFilter(e.target.value)
                                                console.log(e.target.value)}}
                                            >
                                                <SelectItem key={"authors"} value="authors">Authors</SelectItem>
                                                <SelectItem key={"institutions"} value="institutions">Institutions</SelectItem>
                                                <SelectItem key={"keywords"} value="keywords">Keywords</SelectItem>
                                                <SelectItem key={"date"} value="date">Date</SelectItem>
                                            </Select>
                                            {selectedFilter === 'authors' && <Input  label="Author Name" size="sm" variant="bordered" value={authors} onChange={handleAuthorChange} />}
                                            {selectedFilter === 'institutions' && <Input label="Institution Name" size="sm" variant="bordered" value={institutions} onChange={handleInstitutionChange} />}
                                            {selectedFilter === 'keywords' && <Input label="Keywords" size="sm" variant="bordered" value={keywords} onChange={handleKeywordChange} />}
                                            {selectedFilter === 'date' && (
                                                <div className="flex gap-2" >
                                                    <Input placeholder="dd/mm/yyyy" label="Start Date" size="sm" variant="bordered" datatype="date" value={startDate} onChange={handleStartDateChange} />
                                                    <Input placeholder="dd/mm/yyyy" label="End Date" size="sm" variant="bordered" value={endDate} onChange={handleEndDateChange} />
                                                </div>
                                            )}
                                            <Button color="primary" variant="flat" size="sm" className="w-1/2 m-auto" onClick={handleApplyFilter}>
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </PopoverContent>
                    </Popover>
                    </div>
                </div>
            <Feed articles={articleList} documentImagePath="/assets/icons/document.svg" />
        </section>
    );
}

export default isAuth(Page,3);