import type { Card } from "../page/data/card";
import csv from "../assets/Forest shuffle features - Sheet1.csv?raw";
import { parseCSV } from "./parseCsv";

export function loadCards(): Card[] {
    const rows = parseCSV(csv);

    const cards: Card[] = [];
    for (const row of rows) {
        if (row["Spelvariant"] == "") {
            continue;
        }
        const card: Card = {
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
    }

    return cards;
}
