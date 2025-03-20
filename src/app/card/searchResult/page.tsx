'use client'

import { useState } from 'react';
import { autocompleteSearchResults, cardFetch } from '@/actions'

export default function searchResult() {

    const [query, setQuery] = useState("sol");
    const [searchedCard, setSearchedCard] = useState("");


    autocompleteSearchResults(query);
    cardFetch;
    console.log(cardFetch);
    let randomCard = cardFetch;
    // setSearchedCard(randomCard);
    const updateValue = (e: any) => {
        setQuery(e.target.value);
    };

    // const searchParams = ["Name", "Set"]
    return (
        <>
            <div>Search by:</div>
            <ul>
                <li>
                    Name
                </li>

            </ul>

            <input type="text" placeholder="Search..." value={query} name="search" id="search" onChange={updateValue} />


        </>
    )
}
