'use client'

import { useState } from 'react';
import { autocompleteSearchResults, cardFetch } from '@/app/actions'

export default function searchResult() {

    const [query, setQuery] = useState("");
    const [searchedCard, setSearchedCard] = useState("");


    cardFetch;
    console.log(cardFetch);


    let randomCard = cardFetch;
    console.log(randomCard);

    // setSearchedCard(randomCard);
    const updateValue = (e: any) => {
        setQuery(e.target.value);
        autocompleteSearchResults(query);
    };

    const searchParams = ["Name", "Set"]
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
