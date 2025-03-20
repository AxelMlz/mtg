'use client'

import { useEffect, useState } from 'react';
import { autocompleteSearchResults, fetchCardId } from '@/actions'

import styles from '@/styles/navbarBandAid.module.css'
import Link from 'next/link';


export default function NavbarBandAid() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [selectedResult, setSelectedResult] = useState<string[]>([]);

    let cardInfos
    const handleSearch = async () => {
        // setSelectedResult(query);
        // console.log("Recherche exécutée avec :", query);
        if (query !== "") {
            let cardInfos = await fetchCardId(query);
            // setSelectedResult(cardInfos);
        }
    };
    // console.log(selectedResult)
    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim() === "") {
                setResults([]);
                return;
            }

            const searchResult = await autocompleteSearchResults(query);
            setResults(searchResult);
        };

        const debounce = setTimeout(fetchResults, 300); // Évite trop d'appels


        return () => clearTimeout(debounce);
    }, [query]); // Exécute l'effet à chaque changement de query



    return (
        <div id="navbar" className={styles.navbar}>

            <a className="active" href="/">Home</a>
            <a href="/cards">Cards</a>
            <a href="/card/random">Random Card</a>

            <div id="search-container" className={styles.search_container}>
                <form action="">

                    <input type="search" list="search-results" placeholder="Search..." value={query} name="search" id="search" onChange={(e) => setQuery(e.target.value)} className="border p-2 w-full"></input>
                    <datalist id="search-results">
                        {results.map((result, index) => (
                            <option key={index} value={result} />

                        ))}
                    </datalist>
                </form>
                <button onClick={handleSearch} className="rounded-full bg-gradien border border-slate-800 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" > Search card</button>


            </div>
        </div>
    )
}

