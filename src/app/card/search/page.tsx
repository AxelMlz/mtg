'use client'

import { useState } from 'react';
import { searchResults } from '@/app/actions'

export default function Search() {

    const [query, setQuery] = useState("sol");

    console.log(query);

    searchResults(query);

    function updateValue(e) {
        setQuery(e.target.value);
    };

    return (
        <>
            <div>Search your Sol Ring</div>
            <input type="text" placeholder="Search..." value={query} name="search" id="search" onChange={updateValue} />
        </>
    )
}
