'use server'

import { redirect } from "next/navigation";

export async function autocompleteSearchResults(query: string) {
    const data = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${query}`);
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    const cards = await data.json();
    // console.log(cards.data);
    return cards.data;
};
export async function fetchCardId(cardName: string) {

    const formatCardName = (cardName: string | undefined | null): string => {
        if (!cardName || typeof cardName !== "string" || cardName.trim() === "") {
            console.error("Erreur : cardName est invalide !");
            return ""; // Retourne une chaîne vide si la valeur est invalide
        }

        return cardName.replace(/\s+/g, " ").toLowerCase();
    };
    // console.log("fetchCardId ", cardName);
    const id = formatCardName(cardName);
    redirect(`/card/${id}`);
    // return id;
};



export async function fetchCard(id: string) {

    console.log("fetchCard", id);
    const data = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${id}`);
    console.log("data", data);
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    const card = await data.json();
    // console.log(card);
    // redirect(`/card/${id}`);
    return card;

};


// export async function randomCard() {

//     const data = await fetch(`https://api.scryfall.com/cards/random`);
//     if (!data.ok) {
//         throw new Error(`HTTP error! status: ${data.status}`);
//     }
//     const card = await data.json();
//     console.log(card.data);
//     return card.data;
// }