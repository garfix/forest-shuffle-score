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
        const [cardScores, categoryScores, newTotal] = calculateTotal(input, cards, inputs);
        newScores[userName] = { total: newTotal, cardScores: cardScores, categoryScores: categoryScores };
    }
    return newScores;
}

const scoreFuncs: Record<string, (string | number)[]> = {
    Paardenkastanje: ["count^2-max", 7],
    Berk: ["count-x", 1],
    Beuk: ["count-x", 5],
    Linde: ["count-x-1/3"],
};

function calculateTotal(
    input: Input,
    cards: Card[],
    inputs: Inputs,
): [Record<number, number>, Record<string, number>, number] {
    let total = 0;
    const cardScores: Record<number, number> = {};
    const categoryScores: Record<string, number> = {};

    for (const [cardId, count] of Object.entries(input.cardCount)) {
        const card = cards[Number(cardId)];
        const score = calculateCardScore(card, count, inputs);
        cardScores[Number(cardId)] = score;
        categoryScores[card.category] = categoryScores[card.category] ? categoryScores[card.category] + score : score;
        total += score;
    }

    return [cardScores, categoryScores, total];
}

function calculateCardScore(card: Card, count: number, inputs: Inputs) {
    let score = 0;
    const scoreFunc = scoreFuncs[card.name];
    if (scoreFunc) {
        const predicate = scoreFunc[0];
        if (predicate == "count-x") {
            score = (scoreFunc[1] as number) * count;
        } else if (predicate == "count^2-max") {
            const c = Math.min(count, Number(scoreFunc[1]));
            score = c * c;
        } else if (predicate == "count-x-1/3") {
            const m = getMaxCardCount(card, inputs);
            const c = count == m ? 3 : 1;
            score = c * count;
        }
    }
    return score;
}

function getMaxCardCount(card: Card, inputs: Inputs) {
    let max = 0;
    for (const [_, input] of Object.entries(inputs)) {
        if (input.cardCount[card.id]) {
            max = Math.max(max, input.cardCount[card.id]);
        }
    }
    return max;
}
