import type { Card } from "../entity/card";
import type { Score, Scores } from "../entity/score";
import type { User } from "../entity/user";

export function initScores(users: User[]) {
    const scores: Scores = {};
    for (const user of users) {
        scores[user.name] = { card_count: {}, total: 0 };
    }
    return scores;
}

export function calculateScores(scores: Scores, cards: Card[]) {
    const newScores: Scores = {};
    for (const [userName, score] of Object.entries(scores)) {
        const newTotal = calculateTotal(score, cards);
        newScores[userName] = { card_count: score.card_count, total: newTotal };
    }
    return newScores;
}

const scoreFuncs: Record<string, (string | number)[]> = {
    Berk: ["count-x", 1],
};

function calculateTotal(score: Score, cards: Card[]) {
    let total = 0;

    for (const [cardName, count] of Object.entries(score.card_count)) {
        let value = 0;
        const scoreFunc = scoreFuncs[cardName];
        switch (scoreFunc[0]) {
            case "count-x": {
                value = (scoreFunc[1] as number) * count;
            }
        }
        total += value;
    }

    return total;
}
