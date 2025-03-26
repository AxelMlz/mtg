import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./loader";

interface MagicCardProps {
    card: {
        name: string;
        type: string;
        rarity: string;
        mana_cost?: string;
        oracle_text?: string;
        legalities: Record<string, string>;
        released_at: string;
    };
    image: string;
}

// Function to parse mana cost and replace with local SVG files
const parseManaCost = (manaCost?: string) => {
    if (!manaCost) return null;

    return manaCost.replace(/{(.*?)}/g, (match, symbol) => {
        return `<span class="inline-flex items-center">
              <img src="/mana_symbols/${symbol}.svg" 
                   alt="${symbol}" class="w-6 h-6 mx-1" />
            </span>`;
    });
};

const MagicCard: React.FC<MagicCardProps> = ({ card, image }) => {
    const [showLegalities, setShowLegalities] = useState(false);
    const [loading, setLoading] = useState(true);

    // Simulate loading (Replace with actual data fetching logic)
    useEffect(() => {
        setTimeout(() => setLoading(false), 1500); // Simulates a fetch delay
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="w-full flex bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-300 transition-transform hover:scale-105 relative">
                {/* Card Image on the Left */}
                <div className="w-1/3 p-4 flex justify-center items-center">
                    <img className="max-h-80 object-cover rounded-lg shadow-md" src={image} alt={card.name} />
                </div>

                {/* Card Information on the Right */}
                <div className="w-2/3 p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{card.name}</h2>

                        {/* Type with SVG icons */}
                        <p className="text-gray-600 text-sm flex items-center space-x-2">
                            {card.type} - {card.rarity}
                        </p>

                        {/* Mana Cost */}
                        {card.mana_cost && (
                            <p
                                className="mt-2 text-gray-700 font-semibold flex items-center space-x-1"
                                dangerouslySetInnerHTML={{ __html: parseManaCost(card.mana_cost) }}
                            />
                        )}

                        {/* Oracle Text */}
                        {card.oracle_text && (
                            <p className="mt-2 text-gray-500 text-sm italic">"{card.oracle_text}"</p>
                        )}

                        {/* Release Date */}
                        <p className="text-xs text-gray-400 mt-3">Released: {card.released_at}</p>
                    </div>
                </div>
            </div>

            {/* Legality Dropdown on the Far Right */}
            <div className="absolute right-4 top-4">
                <button
                    onClick={() => setShowLegalities(!showLegalities)}
                    className="bg-blue-600 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Legalities ▼
                </button>

                {showLegalities && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 z-50">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Formats:</h3>
                        <ul className="text-sm">
                            {Object.entries(card.legalities).map(([format, status]) => (
                                <li key={format} className="flex justify-between items-center py-1">
                                    <span className="font-medium">{format}</span>
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs ${status === "legal" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                            }`}
                                    >
                                        {status === "legal" ? "Legal" : "Banned"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </>
    );
}



export default MagicCard;
