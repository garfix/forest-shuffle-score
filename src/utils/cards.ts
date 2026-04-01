import type { Card } from "../entity/card";
import csv from "../assets/Forest shuffle features - Sheet1.csv?raw";
import { parseCSV } from "./parseCsv";
import type { Category } from "../entity/category";

export function loadCards(): Card[] {
    const rows = parseCSV(csv);

    const cards: Card[] = [];
    let id = 0;
    for (const row of rows) {
        if (row["Spelvariant"] == "") {
            continue;
        }
        const card: Card = {
            id,
            name: row["Naam"],
            score: row["Score"],
            game_variant: row["Spelvariant"],
            category: row["Categorie"],
            sort: row["Soort"],
            amount: parseInt(row["Hoeveel"]),
            condition: row["Voorwaarde"],
            sub_question: row["Subvraag"],
            unique: row["Uniek"],
        };
        cards.push(card);
        id++;
    }

    return cards;
}

export function getCardsByCategory(cards: Card[], category: Category): Card[] {
    return cards.filter((card) => card.category == category.name);
}
