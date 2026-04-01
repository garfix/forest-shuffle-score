import type { Card } from "../entity/card";
import type { Scores } from "../entity/score";
import type { User } from "../entity/user";
import type { Input, Inputs } from "../entity/input";

export function initInputs(users: User[]) {
    const inputs: Inputs = {};
    for (const user of users) {
        inputs[user.name] = { cardCount: {} };
    }
    return inputs;
}

export function initScores(users: User[]) {
    const scores: Scores = {};
    for (const user of users) {
        scores[user.name] = { total: 0, cardScores: {}, categoryScores: {} };
    }
    return scores;
}

export function calculateScores(inputs: Inputs, cards: Card[]) {
    const newScores: Scores = {};
    for (const [userName, input] of Object.entries(inputs)) {
        const [cardScores, categoryScores, newTotal] = calculateTotal(input, cards);
        newScores[userName] = { total: newTotal, cardScores: cardScores, categoryScores: categoryScores };
    }
    return newScores;
}

const scoreFuncs: Record<string, (string | number)[]> = {
    Berk: ["count-x", 1],
    Paardenkastanje: ["count^2"],
};

function calculateTotal(input: Input, cards: Card[]): [Record<number, number>, Record<string, number>, number] {
    let total = 0;
    const cardScores: Record<number, number> = {};
    const categoryScores: Record<string, number> = {};

    for (const [cardId, count] of Object.entries(input.cardCount)) {
        const card = cards[Number(cardId)];
        const score = calculateCardScore(card.name, count);
        cardScores[Number(cardId)] = score;
        categoryScores[card.category] = categoryScores[card.category] ? categoryScores[card.category] + score : score;
        total += score;
    }

    return [cardScores, categoryScores, total];
}

function calculateCardScore(cardName: string, count: number) {
    let score = 0;
    const scoreFunc = scoreFuncs[cardName];
    if (scoreFunc) {
        const predicate = scoreFunc[0];
        if (predicate == "count-x") {
            score = (scoreFunc[1] as number) * count;
        } else if (predicate == "count^2") {
            score = count * count;
        }
    }
    return score;
}
