'use client'

import React, { useEffect } from 'react'
import { useState } from 'react';
// import { randomCard } from '@/app/actions';

export default function SurpriseCard() {

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

    useEffect(() => {
        randomCard();
    }, [])

    return (
        <>
            <div>

                <button onClick={randomCard} className="rounded-full bg-gradien border border-slate-800 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"> Random Card</button>

                <h1>The surprise card is {surpriseCardName}</h1>
                {/* <h1></h1> */}
                <img src={surpriseCardImage} alt={surpriseCardName} />

            </div>
        </>
    )
}
