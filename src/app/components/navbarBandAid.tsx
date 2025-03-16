'use client'

import { useEffect, useState } from 'react';
import { autocompleteSearchResults, cardFetch } from '@/actions'

import styles from '@/styles/navbarBandAid.module.css'
// import { navbar } from '@material-tailwind/react'

export default function NavbarBandAid() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]); // Stocke les résultats
    const [selectedResult, setSelectedResult] = useState(""); // Stocke la sélection finale

    const handleSearch = () => {
        setSelectedResult(query);
        console.log("Recherche exécutée avec :", query);
        // Tu peux aussi appeler une API ici
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim() === "") {
                setResults([]);
                return;
            }

            const searchResult = await autocompleteSearchResults(query); // Appelle la fonction
            console.log(searchResult);
            setResults(searchResult); // Met à jour l'état avec les résultats
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

                    <input type="search" list="search-results" placeholder="Search..." value={query} name="search" id="search" onChange={(e) => setQuery(e.target.value)} className="border p-2 w-full" onClick={handleSearch}></input>
                    <datalist id="search-results">
                        {results.map((result, index) => (
                            <option key={index} value={result} />
                        ))}
                    </datalist>
                </form>

            </div>
        </div>
    )
}

