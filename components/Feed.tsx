'use client'
import {useState} from "react";

export default function Feed() {
    const [searchText, setSearchText] = useState('');
    return (
        <section className="feed">
            <div className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    // onChange={}
                    required
                    className="search_input peer"
                />
            </div>
        </section>
    );
}