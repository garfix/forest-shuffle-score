import type { Card } from "../entity/card";
import csv from "../assets/Forest shuffle features - Sheet1.csv?raw";
import { parseCSV } from "./parseCsv";
import type { Category } from "../entity/category";
import type { Input, Inputs } from "../entity/input";

export function loadCards(): Card[] {
    const rows = parseCSV(csv);

    const cards: Card[] = [];

    let id = 0;
    const byName: Record<string, Card> = {};

    for (const row of rows) {
        if (row["Spelvariant"] == "") {
            continue;
        }

        const variant = row["Variant van"];
        const canonicalName = variant ? variant : row["Naam"];
        const treatAsSame = row["Als 1 kaart behandelen"] == "ja";
        const amount = parseInt(row["Hoeveel"]);
        const displayName = row["Naam"];

        if (byName[canonicalName] && treatAsSame) {
            const card = byName[canonicalName];
            card.amount += amount;
            if (card.display_name != displayName) {
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
                sub_question_max: ["Bosmier", "Steenmarter"].includes(row["Naam"]) ? "unlimited" : "card",
            };
            byName[card.name] = card;
            cards.push(card);
            id++;
        }
    }

    console.log(cards);

    return cards;
}

export function getCategoryCards(cards: Card[], category: Category): Card[] {
    return cards.filter((card) => card.category == category.name);
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
