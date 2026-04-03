import type { Card } from "../entity/card";
import type { Scores } from "../entity/score";
import type { User } from "../entity/user";
import type { Input, Inputs } from "../entity/input";
import type { Game } from "../entity/game";

export function initInputs(users: User[]) {
    const inputs: Inputs = {};
    for (const user of users) {
        inputs[user.name] = { cardCount: {}, cardSubCount: {}, grotCount: 0, grotCard: "" };
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

export function calculateScores(inputs: Inputs, cards: Card[], game: Game) {
    const newScores: Scores = {};
    for (const [userName, input] of Object.entries(inputs)) {
        const [cardScores, categoryScores, newTotal] = calculateTotal(cards, input, inputs, game);
        newScores[userName] = { total: newTotal, cardScores: cardScores, categoryScores: categoryScores };
    }
    return newScores;
}

const scoreFuncs: Record<string, (string | number)[]> = {
    // Bomen
    Paardenkastanje: ["count^2-max-houtbij", 7],
    Berk: ["count-x", 1],
    Beuk: ["count-x-min-houtbij", 5, 4],
    Linde: ["count-x-users-houtbij"],
    Douglasspar: ["count-x", 5],
    Eik: ["count-x-8trees", 10],
    Zilverspar: ["cards-around"],
    Esdoorn: ["trees-x"],
    "Europese lariks": ["count-x", 3],
    Alpenden: ["sort-count-x", "Alpine", 1],
    "O, dennenboom": ["cards-around"],
    Moseik: ["sort-count-x", "Evenhoevig dier", 1],
    Palmboom: ["sort-count-x", "Vogel", 1],
    "Zachte berk": ["count-x", 1],
    // Boven
    Bosuil: ["count-x", 5],
    Goudvink: ["sort-count-x", "Insect", 2],
    "Grote bonte specht": ["count-x", 10],
    Havik: ["sort-count-x", "Vogel", 3],
    Vink: ["sub-x", 5],
    "Vlaamse gaai": ["count-x", 3],
    Ekster: ["count-x", 3],
    Kerkuil: ["sort-count-x", "Vleermuis", 3],
    Nachtegaal: ["sub-x", 5],
    "Rode kardinaal": ["count-x", 5],
    Roodborstje: ["sort-count-x", "Insect", 1],
    Lammergier: ["grot-x", 1],
};

function calculateTotal(
    cards: Card[],
    input: Input,
    inputs: Inputs,
    game: Game,
): [Record<number, number>, Record<string, number>, number] {
    let total = 0;
    const cardScores: Record<number, number> = {};
    const categoryScores: Record<string, number> = {};

    for (const [cardId, count] of Object.entries(input.cardCount)) {
        const card = cards[Number(cardId)];
        const score = calculateCardScore(count, card, cards, input, inputs);
        cardScores[Number(cardId)] = score;
        categoryScores[card.category] = categoryScores[card.category] ? categoryScores[card.category] + score : score;
        total += score;
    }

    const grotScore = calculateGrotScore(input, game, cards);
    categoryScores["Grot"] = grotScore;
    total += grotScore;

    return [cardScores, categoryScores, total];
}

function calculateGrotScore(input: Input, game: Game, cards: Card[]) {
    if (game.spelVarianten.includes("Exploration")) {
        if (input.grotCard == "Spaargrot") {
            return input.grotCount * 2;
        } else if (input.grotCard == "Vleermuizengrot") {
            return input.grotCount + 3 * getSortCount(input, cards, "Vleermuis");
        } else if (input.grotCard == "Verlaten grot") {
            if (input.grotCount == 0) {
                return 5;
            } else {
                return input.grotCount;
            }
        }
    }

    return input.grotCount;
}

function calculateCardScore(count: number, card: Card, cards: Card[], input: Input, inputs: Inputs) {
    let score = 0;
    const scoreFunc = scoreFuncs[card.name];
    if (scoreFunc) {
        const predicate = scoreFunc[0];
        if (predicate == "count-x") {
            score = (scoreFunc[1] as number) * count;
        } else if (predicate == "count-x-min-houtbij") {
            const houtbij = input.cardSubCount[card.id] ?? 0;
            const totalCount = count + houtbij;
            if (typeof scoreFunc[2] == "number" && totalCount >= scoreFunc[2]) {
                score = (scoreFunc[1] as number) * totalCount;
            }
        } else if (predicate == "count^2-max-houtbij") {
            const houtbij = input.cardSubCount[card.id] ?? 0;
            const totalCount = count + houtbij;
            const c = Math.min(totalCount, Number(scoreFunc[1]));
            score = c * c;
        } else if (predicate == "count-x-users-houtbij") {
            const houtbij = input.cardSubCount[card.id] ?? 0;
            const totalCount = count + houtbij;
            const m = getMaxCardCount(card, inputs, true);
            score = (totalCount == m ? 3 : 1) * totalCount;
        } else if (predicate == "count-x-8trees") {
            const m = getCountDifferentTrees(input, cards);
            if (typeof scoreFunc[1] == "number" && m >= 8) {
                score = scoreFunc[1] * count;
            }
        } else if (predicate == "cards-around") {
            const cardsAround = input.cardSubCount[card.id] ?? 0;
            score = cardsAround * 2;
        } else if (predicate == "trees-x") {
            score = getSortCount(input, cards, "Boom") * count;
        } else if (predicate == "sort-count-x") {
            if (typeof scoreFunc[2] == "number") {
                score = getSortCount(input, cards, scoreFunc[1] as string) * scoreFunc[2] * count;
            }
        } else if (predicate == "sub-x") {
            const cardsOp = input.cardSubCount[card.id] ?? 0;
            const totalCount = Math.min(count, cardsOp);
            if (typeof scoreFunc[1] == "number") {
                score = scoreFunc[1] * totalCount;
            }
        } else if (predicate == "grot-x") {
            const m = input.grotCount;
            score = (scoreFunc[1] as number) * m * count;
        }
    }
    return score;
}

function getMaxCardCount(card: Card, inputs: Inputs, houtbij: boolean) {
    let max = 0;
    for (const [_, input] of Object.entries(inputs)) {
        if (input.cardCount[card.id]) {
            let totalCount = input.cardCount[card.id];
            if (houtbij && !!input.cardSubCount[card.id]) {
                totalCount += input.cardSubCount[card.id];
            }
            max = Math.max(max, totalCount);
        }
    }
    return max;
}

function getSortCount(input: Input, cards: Card[], sort: string) {
    let count = 0;
    for (const card of cards) {
        if (card.sort.includes(sort)) {
            if (input.cardCount[card.id] && input.cardCount[card.id] > 0) {
                count += input.cardCount[card.id];
            }
        }
    }
    return count;
}

function getCountDifferentTrees(input: Input, cards: Card[]) {
    const trees = new Set<string>();
    for (const card of cards) {
        if (card.sort.includes("Boom")) {
            if (input.cardCount[card.id] && input.cardCount[card.id] > 0) {
                trees.add(card.canonical_name);
            }
        }
    }
    return trees.size;
}
