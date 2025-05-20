'use client'

import { useEffect, useState } from 'react';
import { autocompleteSearchResults, fetchCardId } from '@/actions';

export default function SubNavbar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = async () => {
        if (query !== '') {
            const cardInfos = await fetchCardId(query);
            // Traiter les infos ici si besoin
        }
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim() === '') {
                setResults([]);
                return;
            }

            const searchResult = await autocompleteSearchResults(query);
            setResults(searchResult);
        };

        const debounce = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className="fixed top-[52px] z-40 w-full bg-blue-600 px-4 py-2 shadow-md">
            <form
                className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <input
                    type="search"
                    list="search-results"
                    placeholder="Search cards..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full flex-grow rounded-full border border-transparent bg-gray-100 px-4 py-2 text-sm text-gray-800 shadow-inner outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-400"
                />
                <datalist id="search-results">
                    {results.map((result, index) => (
                        <option key={index} value={result} />
                    ))}
                </datalist>
                <button
                    type="submit"
                    className="w-full rounded-full bg-blue-800 px-4 py-2 text-sm text-white shadow-md transition hover:bg-blue-900 sm:w-auto"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
