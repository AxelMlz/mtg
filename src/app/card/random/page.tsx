'use client'

import React from 'react'
import { useState } from 'react';
// import { randomCard } from '@/app/actions';

export default function surpriseCard() {

    const [surpriseCardData, setSurpriseCardData] = useState<object>();
    const [surpriseCardName, setSurpriseCardName] = useState<string>();
    const [surpriseCardImage, setSurpriseCardImage] = useState<string>();

    async function randomCard() {

        const data = await fetch(`https://api.scryfall.com/cards/random`);
        if (!data.ok) {
            throw new Error(`HTTP error! status: ${data.status}`);
        }
        const card = await data.json();
        console.log(card);
        setSurpriseCardName(card.name);
        setSurpriseCardImage(card.image_uris.normal);
        return card;
    }

    return (
        <>
            <div>

                <button onClick={randomCard} type="button" className="text-white bg-gradient-to-br from-red-400 to-pink-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Random Card</button>
                <h1>The surprise card is {surpriseCardName}</h1>
                {/* <h1></h1> */}
                <img src={surpriseCardImage} alt={surpriseCardName} />

            </div>
        </>
    )
}
