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
        if (byName[row["Naam"]]) {
            const card = byName[row["Naam"]];
            card.amount += parseInt(row["Hoeveel"]);
        } else {
            const card: Card = {
                id,
                name: row["Naam"],
                score: row["Score"],
                game_variant: row["Spelvariant"],
                category: row["Categorie"],
                sort: row["Soort"].split(",").map((s) => s.trim()),
                amount: parseInt(row["Hoeveel"]),
                condition: row["Voorwaarde"],
                sub_question: row["Subvraag"],
                belongs_to: row["Valt onder"],
                canonical_name: row["Valt onder"] ? row["Valt onder"] : row["Naam"],
            };
            byName[card.name] = card;
            cards.push(card);
            id++;
        }
    }

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
