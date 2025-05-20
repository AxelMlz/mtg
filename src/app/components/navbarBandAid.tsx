'use client'

import { useEffect, useState } from 'react';
import { autocompleteSearchResults, fetchCardId } from '@/actions'

import styles from '@/styles/navbarBandAid.module.css'
import Link from 'next/link';


export default function NavbarBandAid() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    function search() {

        async () => {
            if (query !== '') {
                const cardInfos = await fetchCardId(query);
                // Traiter les infos ici si besoin
            }
        };
    }
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
        <>
            <div id="navbar" className={styles.navbar}>

                <a className="active" href="/">Home</a>
                <a href="/cards">Cards</a>
                <a href="/card/random">Random Card</a>


                <div className='search_container'>
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
                                <option key={index} value={result} onClick={search} />
                            ))}
                        </datalist>

                    </form>
                </div>
            </div>
        </>
    )
}

