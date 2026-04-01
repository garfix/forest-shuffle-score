import type { Card } from "../entity/card";
import type { Scores } from "../entity/score";
import type { User } from "../entity/user";
import type { Input, Inputs } from "../entity/input";

export function initInputs(users: User[]) {
    const inputs: Inputs = {};
    for (const user of users) {
        inputs[user.name] = { card_count: {} };
    }
    return inputs;
}

export function initScores(users: User[]) {
    const scores: Scores = {};
    for (const user of users) {
        scores[user.name] = { total: 0 };
    }
    return scores;
}

export function calculateScores(inputs: Inputs, cards: Card[]) {
    const newScores: Scores = {};
    for (const [userName, input] of Object.entries(inputs)) {
        const newTotal = calculateTotal(input, cards);
        newScores[userName] = { total: newTotal };
    }
    return newScores;
}

const scoreFuncs: Record<string, (string | number)[]> = {
    Berk: ["count-x", 1],
};

function calculateTotal(input: Input, cards: Card[]) {
    let total = 0;

    for (const [cardId, count] of Object.entries(input.card_count)) {
        let value = 0;
        const cardName = cards[Number(cardId)].name;
        const scoreFunc = scoreFuncs[cardName];
        console.log(cardName, scoreFunc);
        if (scoreFunc) {
            switch (scoreFunc[0]) {
                case "count-x": {
                    value = (scoreFunc[1] as number) * count;
                }
            }
        }
        total += value;
    }

    return total;
}
