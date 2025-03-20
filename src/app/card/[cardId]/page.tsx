'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCard } from "@/actions";

export default function CardDetails() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [cardId, setCardId] = useState<string>(""); // Doit être une string, pas un tableau
    const [cardData, setCardData] = useState<object>();
    const [cardName, setCardName] = useState<string>("");
    const [cardImage, setCardImage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const url = `${pathname}?${searchParams}`;
            // console.log(url);

            // Simuler une opération asynchrone (ex: API call)
            await new Promise((resolve) => setTimeout(resolve, 500));

            setCardId(url); // Met à jour l'état après l'opération asynchrone
        };

        fetchData();
        // console.log("before fetching card data...");

    }, [pathname, searchParams]);

    useEffect(() => {
        const getCardData = async () => {
            if (!cardId) return; // Évite d'exécuter fetchCard si cardId est null

            try {
                // console.log(`Fetching card with ID: ${cardId}`);
                const data = await fetchCard(cardId); // Appel de la fonction importée

                // Met à jour les états avec les données récupérées
                setCardData(data || "Nom inconnu");
                setCardName(data.name || "Nom inconnu");
                setCardImage(data.image_uris.normal || "https://via.placeholder.com/150"); // Image par défaut si absente
            } catch (error) {
                console.error(error);

                setCardName("Nom inconnu");
                setCardImage("https://via.placeholder.com/150"); // Image de fallback en cas d'erreur
            }
        };

        getCardData();
    }, [cardId]); // useEffect se déclenche lorsque cardId change

    return (
        <div>
            {cardName && <h1>{cardName}</h1>}

            {cardImage ? (
                <img src={cardImage} alt={cardName || "Image de la carte"} />
            ) : (
                <p>Aucune image disponible</p> // Message alternatif si pas d'image
            )}
        </div>
    );
}