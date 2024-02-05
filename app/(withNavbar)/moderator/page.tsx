"use client"
import Image from "next/image";
import wavingHand from "@/public/assets/icons/WavingHand.png";
import {articles} from "@/constants";
import Feed from "@/components/Feed";
import isAuth from "@/components/isAuth";
import { useEffect, useState } from "react";
import { Article } from "@/types";
const API_URL = process.env.API_URL || 'http://localhost:8000';


function Page() {
    const accessToken = localStorage.getItem('accessToken');
    const [articleRevList , setArticleRevList] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch(`${API_URL}/articles/?validated=False`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            setArticleRevList(data.articles);
        }
        fetchArticles();
    }, [])


    return (
        <div className="w-2/4 m-auto">
            <h1 className=' text-4xl font-bold felx items-center py-10  '>
                <Image src={wavingHand} alt='waving hand' height={70} width={70} className=' inline-block mr-3'></Image> Welcome Back <span className='purple_gradient'>Moderator</span>
            {/*  TODO: change it to get the name of the moderator  */}
            </h1>


            <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-medium mb-4">Articles you need to review</h2>
            <Feed articles={articleRevList} documentImagePath="/assets/icons/unverifiedDocument.svg"/>
            </div>
        </div>
    );
}

export default isAuth(Page,2);