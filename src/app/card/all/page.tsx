import React from 'react'

export default async function allCard() {

    const data = await fetch('https://api.vercel.app/blog');
    const cards = await data.json();

    return (
        <>
            {/* {cards.map((card) => (
                <div key={card.id}></div>
            ))} */}
        </>
    )
}
