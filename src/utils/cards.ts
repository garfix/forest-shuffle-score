import { COLOR_TYPE_FIXED, COLOR_TYPE_NONE, COLOR_TYPE_SOME, type Card } from "../entity/card";
import csv from "../assets/Forest shuffle features - Sheet1.csv?raw";
import { parseCSV } from "./parseCsv";
import type { Category } from "../entity/category";
import type { Input, Inputs } from "../entity/input";
import type { Game } from "../entity/game";

type Color = {
    colors: string[];
    type: string;
};

export function loadCards(game: Game): Card[] {
    const rows = parseCSV(csv);

    const cards: Card[] = [];

    let id = 0;
    const byName: Record<string, Card> = {};

    const colors: Record<string, Color> = {
        Wisent: {
            colors: ["darkgreen", "brown"],
            type: COLOR_TYPE_FIXED,
        },
        Eland: {
            colors: ["lightblue", "lightgreen"],
            type: COLOR_TYPE_FIXED,
        },
        Es: {
            colors: ["darkblue2"],
            type: COLOR_TYPE_FIXED,
        },
        Beek: {
            colors: ["darkyellow"],
            type: COLOR_TYPE_FIXED,
        },
        "Gladde slang": {
            colors: ["lightgreen"],
            type: COLOR_TYPE_FIXED,
        },
        "Gele pavia": {
            colors: ["orange"],
            type: COLOR_TYPE_FIXED,
        },
        Ree: {
            colors: ["darkblue", "yellow", "lightgreen", "darkgreen", "orange"],
            type: COLOR_TYPE_SOME,
        },
        "Ree (Dartmoor)": {
            colors: ["lightgreen", "darkblue2", "greyblue", "greyblue2", "oldpink"],
            type: COLOR_TYPE_SOME,
        },
        Gems: {
            colors: ["lightblue", "pink", "purple"],
            type: COLOR_TYPE_SOME,
        },
        Kalkoen: {
            colors: ["lightgreen", "orange", "yellow", "red"],
            type: COLOR_TYPE_SOME,
        },
    };

    for (const row of rows) {
        if (row["Spelvariant"] == "") {
            continue;
        }

        if (!game.spelVarianten.includes(row["Spelvariant"])) {
            continue;
        }

        const variant = row["Variant van"];
        const canonicalName = variant ? variant : row["Naam"];
        const treatAsSame = row["Als 1 kaart behandelen"] == "ja";
        const amount = parseInt(row["Hoeveel"]);
        const displayName = row["Naam"];

        if (byName[canonicalName] && (canonicalName === displayName || treatAsSame)) {
            const card = byName[canonicalName];
            card.amount += amount;
            const names = card.display_name.split(" / ");
            if (!names.includes(displayName)) {
                card.display_name += " / " + displayName;
            }
        } else {
            const card: Card = {
                id,
                name: row["Naam"],
                display_name: displayName,
                score: row["Score"],
                game_variant: row["Spelvariant"],
                category: row["Categorie"],
                sort: row["Soort"].split(",").map((s) => s.trim()),
                amount: amount,
                condition: row["Voorwaarde"],
                sub_question: row["Subvraag"],
                belongs_to: variant,
                canonical_name: canonicalName,
                sub_question_max: row["Subvraag max"],
                colors: colors[displayName]?.colors ?? [],
                colorType: colors[displayName]?.type ?? COLOR_TYPE_NONE,
            };
            byName[card.name] = card;
            cards.push(card);
            id++;
        }
    }

    return cards;
}

export function getCategoryCards(cards: Card[], category: Category): Record<string, Card[]> {
    const filtered = cards.filter((card) => card.category == category.name);
    const sorted = filtered.sort((c1: Card, c2: Card) => {
        if (c1.sort[0] < c2.sort[0]) {
            return -1;
        } else if (c1.sort[0] > c2.sort[0]) {
            return 1;
        }
        if (c1.display_name < c2.display_name) {
            return -1;
        } else if (c1.display_name > c2.display_name) {
            return 1;
        }
        return 0;
    });
    const grouped: Record<string, Card[]> = {};
    for (const card of sorted) {
        const sort = card.sort[0];
        if (!grouped[sort]) {
            grouped[card.sort[0]] = [];
        }

        grouped[sort].push(card);
    }
    return grouped;
}

export function getCountsByCategory(cards: Card[], input: Input) {
    const counts: Record<string, number> = {};
    for (const card of cards) {
        const cardCount = input.cardCount[card.id];
        if (cardCount) {
            counts[card.category] = counts[card.category] ? counts[card.category] + cardCount : cardCount;
        }
    }

    counts["Grot"] = input.grotCount;

    return counts;
}

export function getCountsByUser(inputs: Inputs) {
    const counts: Record<string, number> = {};
    for (const [userName, input] of Object.entries(inputs)) {
        let sum = 0;
        for (const [_, count] of Object.entries(input.cardCount)) {
            sum += count;
        }
        counts[userName] = sum;
    }
    return counts;
}

// Returns the amount of cards the user may claim
// Based on the amount of cards others have claimed
export function getFreeCount(card: Card, inputs: Inputs, userId: number) {
    let freeCount = card.amount;

    if (!freeCount) {
        return freeCount;
    }

    for (const [aUserId, input] of Object.entries(inputs)) {
        if (userId !== Number(aUserId)) {
            freeCount -= input.cardCount[card.id] ?? 0;
        }
    }

    return freeCount;
}

// Returns a simple list of all colors selected for cards with tree colors
export function getUsedColors(inputs: Inputs, userId: number, cards: Card[]) {
    let allColors: string[] = [];

    for (const card of cards) {
        if (inputs[userId].cardCount[card.id]) {
            if (card.colorType == COLOR_TYPE_FIXED) {
                allColors = allColors.concat(...card.colors);
            } else if (inputs[userId].colorCardChecks[card.id]) {
                allColors = allColors.concat(...inputs[userId].colorCardChecks[card.id]);
            }
        }
    }

    return [...new Set(allColors)];
}
