'use client'
import {useState} from "react";

export default function SearchInput() {
    const [searchText, setSearchText] = useState<string>('');
    return (
        <section className="feed">
            <div className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for an article"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                    className="search_input peer"
                />
            </div>
        </section>
    );
}