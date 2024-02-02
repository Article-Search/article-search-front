import FavoritesFeed from "@/components/FavoritesFeed";
import {articles} from "@/constants";

export default function Page() {
    return (
        <div className="w-2/4 m-auto">
            <h1 className=' text-4xl font-bold felx items-center py-10 purple_gradient'>
                 Favorites
            </h1>

            <div className="flex flex-col items-center justify-center">
                <FavoritesFeed articles={articles} documentImagePath="/assets/icons/document.svg"/>
            </div>
        </div>
    );
}