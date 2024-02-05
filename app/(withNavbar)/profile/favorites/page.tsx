"use client"
import FavoritesFeed from "@/components/FavoritesFeed";
import {articles} from "@/constants";
import { Article } from "@/types";
import { useEffect, useState } from "react";
const API_URL = process.env.API_URL || 'http://localhost:8000';


export default function Page() {
    const accessToken = localStorage.getItem('accessToken');
    const [favorites, setFavorites] = useState<Article[]>([]);
    const [fetched, setFetched] = useState(false);
    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch(`${API_URL}/profile/getFavorites/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    },
            });
            const data = await response.json();
            setFavorites(data.articles);
            setFetched(true);
        }
        fetchArticles();
        // setFavorites(articles);
        // setFetched(true);
    }, []);
    return (
        <div className="w-2/4 m-auto">
            <h1 className=' text-4xl font-bold felx items-center py-10 purple_gradient'>
                Favorites
            </h1>

            <div className="flex flex-col items-center justify-center">
                {!fetched && <p>Loading...</p>}
                {fetched && <FavoritesFeed articles={favorites} documentImagePath="/assets/icons/document.svg"/>}
            </div>
        </div>
    );
}