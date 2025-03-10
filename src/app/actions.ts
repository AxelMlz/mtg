'use server'

export async function autocompleteSearchResults(query: string) {
    const data = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${query}`);
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    const cards = await data.json();
    console.log(cards.data);
    return cards.data;
};
export async function cardFetch() {
    const data = await fetch(`https://api.scryfall.com/cards/56ebc372-aabd-4174-a943-c7bf59e5028d`);
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    const card = await data.json();
    console.log(card);
    return card;
};

export async function randomCard() {

    const data = await fetch(`https://api.scryfall.com/cards/random`);
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
    }
    const card = await data.json();
    console.log(card.data);
    return card.data;
}