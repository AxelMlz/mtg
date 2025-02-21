'use server'

export async function searchResults(query: string) {
    const data = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${query}`);
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    const cards = await data.json();
    console.log(cards);
    return cards
};