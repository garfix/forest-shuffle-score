import type { Card } from "../entity/card";
import type { Scores } from "../entity/score";
import type { User } from "../entity/user";
import type { Input, Inputs } from "../entity/input";
import type { Game } from "../entity/game";

export function initInputs(users: User[]) {
    const inputs: Inputs = {};
    for (const user of users) {
        inputs[user.name] = {
            cardCount: {},
            cardSubCount: {},
            grotCount: 0,
            grotCard: "",
            colorCardCount: {},
            colorCardChecks: {},
        };
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

const scoreFuncs: Record<string, (string | number | string[])[]> = {
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
    "Grote bonte specht": ["count-x-most-sort", 10, "Boom"],
    Havik: ["sort-count-x", "Vogel", 3],
    Vink: ["sub-x", 5],
    "Vlaamse gaai": ["count-x", 3],
    Ekster: ["count-x", 3],
    Kerkuil: ["sort-count-x", "Vleermuis", 3],
    Nachtegaal: ["sub-x", 5],
    "Rode kardinaal": ["count-x", 5],
    Roodborstje: ["sort-count-x", "Insect", 1],
    Lammergier: ["grot-x", 1],
    Raaf: ["count-x", 5],
    Steenarend: ["2-sort-count-x", "Pootdier", "Amfibie", 1],
    Koekoek: ["count-x", 7],
    Paapje: ["sort-count-x", "Plant", 1],
    Dagpauwoog: ["vlinder-telling"],
    "Grote vos": ["vlinder-telling"],
    "Grote weerschijnvlinder": ["vlinder-telling"],
    Keizersmantel: ["vlinder-telling"],
    Rouwmantel: ["vlinder-telling"],
    Landkaartje: ["vlinder-telling"],
    "Kleine Apollovlinder": ["vlinder-telling"],
    Citroenvlinder: ["vlinder-telling"],
    "Rode eekhoorn": ["sub-x", 5],
    Maretak: ["sort-count-x", "Plant", 1],

    // Onder
    Boomvarens: ["sort-count-x", "Amfibie", 6],
    Bramen: ["sort-count-x", "Plant", 2],
    Mos: ["count-x", 10],
    "Wilde aardbeien": ["count-x-8trees", 10],
    "Grote brandnetel": ["sort-count-x", "Vlinder", 2],
    Vingerhoedskruid: ["vingerhoedskruid-telling"],
    "Blauwe bes": ["unique-sort-count-x", "Vogel", 2],
    Edelweiss: ["count-x", 3],
    Gentiaan: ["sort-count-x", "Vlinder", 3],
    Bostulp: ["count-x", 3],
    Wateraardbei: ["wateraardbei-telling"],
    Boomkikker: ["canonical-name-card-count-x", "Mug", 5],
    "Gewone pad": ["sub-x", 5],
    Moerasschildpad: ["count-x", 5],
    Vuursalamander: ["vuursalamander-telling"],
    Alpenwatersalamander: ["sort-count-x", "Insect", 2],
    Bosmier: ["sub-x", 2],
    "Vliegend hert": ["sort-count-x", "Pootdier", 1],
    Vuurvliegjes: ["vuurvliegjes-telling"],
    Egel: ["sort-count-x", "Vlinder", 2],

    // Naast
    "Europese das": ["count-x", 2],
    "Europese haas": ["count^2", 1],
    Lynx: ["count-x-min-card", 10, 1, "Ree"],
    Relmuis: ["sub-x", 15],
    "Rode vos": ["canonical-name-card-count-x", "Europese haas", 2],
    Steenmarter: ["sub-x", 5],
    Wolf: ["sort-count-x", "Hert", 5],
    Bunzing: ["sub-x", 10],
    "Wilde kat": ["sort-count-x", "Woodland edge", 1],
    Alpenmarmot: ["unique-sort-count-x", "Plant", 3],
    Civetkat: ["count-x", 5],
    "Rode panda": ["count-x", 2],
    Sabelmarter: ["sort-count-x", "Pootdier", 3],
    Trol: ["sort-count-x", "Boom", 1],
    Damhert: ["sort-count-x", "Evenhoevig dier", 3],
    Edelhert: ["2-sort-count-x", "Boom", "Plant", 1],
    Ree: ["color-card-counts-checked", ["darkblue", "yellow", "lightgreen", "darkgreen", "orange"], 3],
    Wildzwijn: ["count-x-min-card", 10, 1, "Zwijnenbig"],
    Zwijnenbig: ["count-x", 1],
    "Wild zwijn (zeug)": ["canonical-name-card-count-x", "Zwijnenbig", 10],
    Wisent: ["color-card-counts-x", ["darkgreen", "brown"], 2],
    Alpensteenbok: ["count-x", 10],
    Gems: ["color-card-counts-checked", ["lightblue", "pink", "purple"], 3],
    Eland: ["color-card-counts-x", ["sapling", "lightblue", "lightgreen"], 2],
    "Bechsteins vleermuis": ["count-x-min", 5, 3, "Vleermuis"],
    "Bruine grootoorvleermuis": ["count-x-min", 5, 3, "Vleermuis"],
    "Grote hoefijzerneus": ["count-x-min", 5, 3, "Vleermuis"],
    Mopsvleermuis: ["count-x-min", 5, 3, "Vleermuis"],
    "Gewone dwergvleermuis": ["count-x-min", 5, 3, "Vleermuis"],
    "Savi's dwergvleermuis": ["count-x-min", 5, 3, "Vleermuis"],
    Mug: ["sort-count-x", "Vleermuis", 1],
    "Vliegende hooiwagen": ["sort-count-x", "Vleermuis", 1],
    "Zwerm honingbijen": ["sort-count-x", "Plant", 1],
    Auerhoen: ["sort-count-x", "Plant", 1],
    Ooievaar: ["2-sort-count-x", "Insect", "Amfibie", 1],
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
    const vlinderStats: VlinderStats = getVlinderStats(input, cards);

    for (const [cardId, count] of Object.entries(input.cardCount)) {
        const card = cards[Number(cardId)];
        const score = calculateCardScore(count, card, cards, input, inputs, vlinderStats);
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

type VlinderStats = {
    ["cardsPerLayer"]: number[][];
    ["scorePerLayer"]: number[];
    ["layerCount"]: number;
};

function calculateCardScore(
    count: number,
    card: Card,
    cards: Card[],
    input: Input,
    inputs: Inputs,
    vlinderStats: VlinderStats,
) {
    if (count == 0) {
        return 0;
    }

    const scoreFunc = scoreFuncs[card.name];

    let score = 0;
    if (scoreFunc) {
        const predicate = scoreFunc[0];
        if (predicate == "count-x") {
            score = (scoreFunc[1] as number) * count;
        } else if (predicate == "count-x-min") {
            if (getDifferentCanonicalNamesOfSortCount(input, cards, String(scoreFunc[3])) >= Number(scoreFunc[2])) {
                score = Number(scoreFunc[1]) * count;
            }
        } else if (predicate == "count-x-min-card") {
            const c = getCardByCanonicalName(scoreFunc[3] as string, cards)!;
            if (input.cardCount[c.id] && input.cardCount[card.id] >= Number(scoreFunc[2])) {
                score = Number(scoreFunc[1]) * count;
            }
        } else if (predicate == "count-x-min-houtbij") {
            const houtbij = input.cardSubCount[card.id] ?? 0;
            const totalCount = count + houtbij;
            if (totalCount >= Number(scoreFunc[2])) {
                score = Number(scoreFunc[1]) * totalCount;
            }
        } else if (predicate == "count^2") {
            score = count * count;
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
        } else if (predicate == "count-x-most-sort") {
            const sort = scoreFunc[2] as string;
            const [max, maxUsers] = getMaxSortCount(cards, inputs, sort);
            if (maxUsers.length === 1 && getSortCount(input, cards, sort) === max) {
                score = Number(scoreFunc[1]) * count;
            }
        } else if (predicate == "count-x-8trees") {
            const m = getDifferentCanonicalNamesOfSortCount(input, cards, "Boom");
            if (m >= 8) {
                score = Number(scoreFunc[1]) * count;
            }
        } else if (predicate == "cards-around") {
            const cardsAround = input.cardSubCount[card.id] ?? 0;
            score = cardsAround * 2;
        } else if (predicate == "trees-x") {
            score = getSortCount(input, cards, "Boom") * count;
        } else if (predicate == "canonical-name-card-count-x") {
            score = getCanonicalNameCardCount(input, cards, scoreFunc[1] as string) * Number(scoreFunc[2]) * count;
        } else if (predicate == "sort-count-x") {
            score = getSortCount(input, cards, scoreFunc[1] as string) * Number(scoreFunc[2]) * count;
        } else if (predicate == "unique-sort-count-x") {
            score =
                getDifferentCanonicalNamesOfSortCount(input, cards, scoreFunc[1] as string) *
                Number(scoreFunc[2]) *
                count;
        } else if (predicate == "2-sort-count-x") {
            score =
                (getSortCount(input, cards, scoreFunc[1] as string) +
                    getSortCount(input, cards, scoreFunc[2] as string)) *
                Number(scoreFunc[3]) *
                count;
        } else if (predicate == "sub-x") {
            const subCount = input.cardSubCount[card.id] ?? 0;
            score = Number(scoreFunc[1]) * subCount;
        } else if (predicate == "grot-x") {
            const m = input.grotCount;
            score = (scoreFunc[1] as number) * m * count;
        } else if (predicate == "color-card-counts-x") {
            score = 0;
            for (const color of scoreFunc[1] as string[]) {
                score += (input.colorCardCount[color] ?? 0) * Number(scoreFunc[2]) * count;
            }
        } else if (predicate == "color-card-counts-checked") {
            score = 0;
            for (const color of scoreFunc[1] as string[]) {
                if (input.colorCardChecks[card.id] && input.colorCardChecks[card.id].includes(color)) {
                    score += (input.colorCardCount[color] ?? 0) * Number(scoreFunc[2]);
                }
            }
        } else if (predicate == "vlinder-telling") {
            score = 0;
            for (let layer = 0; layer < vlinderStats.layerCount; layer++) {
                if (vlinderStats.cardsPerLayer[layer].includes(card.id)) {
                    score += vlinderStats.scorePerLayer[layer] / vlinderStats.cardsPerLayer[layer].length;
                }
            }
        } else if (predicate == "vingerhoedskruid-telling") {
            const m = getDifferentCanonicalNamesOfSortCount(input, cards, "Plant");
            score = getIndexedScore(m, { 0: 0, 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 }) * count;
        } else if (predicate == "wateraardbei-telling") {
            const m = getSortCount(input, cards, "Boom");
            score =
                getIndexedScore(m, { 0: 15, 1: 15, 2: 15, 3: 15, 4: 15, 5: 15, 6: 10, 7: 10, 8: 10, 9: 10, 11: 3 }) *
                count;
        } else if (predicate == "vuursalamander-telling") {
            const m = getCanonicalNameCardCount(input, cards, "Vuursalamander");
            score = getIndexedScore(m, { 0: 0, 1: 5, 2: 15, 3: 25 });
        } else if (predicate == "vuurvliegjes-telling") {
            score = getIndexedScore(count, { 0: 0, 1: 0, 2: 10, 3: 15, 4: 20 });
        }
    }
    return score;
}

function getIndexedScore(count: number, lookup: Record<number, number>) {
    const n = Math.max(...Object.keys(lookup).map(Number));
    const d = Math.min(n, count);
    return lookup[d];
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

function getMaxSortCount(cards: Card[], inputs: Inputs, sort: string): [number, string[]] {
    let max = 0;
    const maxUsers = [];
    for (const [user, input] of Object.entries(inputs)) {
        let count = 0;
        for (const card of cards) {
            if (card.sort.includes(sort)) {
                count += input.cardCount[card.id] ?? 0;
            }
        }

        if (count > max) {
            max = Math.max(max, count);
            maxUsers.push(user);
        }
    }
    return [max, maxUsers];
}

function getCanonicalNameCardCount(input: Input, cards: Card[], cardName: string) {
    let count = 0;
    for (const card of cards) {
        if (card.canonical_name === cardName) {
            if (input.cardCount[card.id] && input.cardCount[card.id] > 0) {
                count += input.cardCount[card.id];
            }
        }
    }
    return count;
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

function getDifferentCanonicalNamesOfSortCount(input: Input, cards: Card[], sort: string) {
    const items = new Set<string>();
    for (const card of cards) {
        if (card.sort.includes(sort)) {
            if (input.cardCount[card.id] && input.cardCount[card.id] > 0) {
                items.add(card.canonical_name);
            }
        }
    }
    return items.size;
}

function getVlinderStats(input: Input, cards: Card[]): VlinderStats {
    const cardCounts: Record<number, number> = {};
    const kleineAppoloVlinder = getCardScoreByCanonicalName(cards, "Kleine Apollovlinder", input);
    const landKaartje = getCardScoreByCanonicalName(cards, "Landkaartje", input);
    const citroenvlinder = getCardScoreByCanonicalName(cards, "Citroenvlinder", input);

    for (const card of cards) {
        if (card.sort.includes("Vlinder")) {
            if (input.cardCount[card.id]) {
                cardCounts[card.id] = input.cardCount[card.id];
            }
        }
    }

    const scorePerLayer: number[] = [];
    const cardsPerLayer: number[][] = [];
    const layerCount = 4;
    for (let layer = 0; layer < layerCount; layer++) {
        let cardsInLayer: number[] = [];
        for (const [cardId, cardCount] of Object.entries(cardCounts)) {
            if (cardCount > layer) {
                cardsInLayer.push(Number(cardId));
            }
        }
        let count = cardsInLayer.length;
        if (citroenvlinder) {
            count = Math.min(count, 8);
        } else if (landKaartje) {
            count = Math.min(count, 7);
        } else if (kleineAppoloVlinder) {
            count = Math.min(count, 6);
        } else {
            count = Math.min(count, 5);
        }

        cardsPerLayer.push(cardsInLayer.slice(0, count));
        scorePerLayer[layer] = { 0: 0, 1: 0, 2: 3, 3: 6, 4: 12, 5: 20, 6: 35, 7: 55, 8: 80 }[count]!;
    }

    return {
        layerCount,
        cardsPerLayer,
        scorePerLayer,
    };
}

function getCardScoreByCanonicalName(cards: Card[], cardName: string, input: Input) {
    const card = getCardByCanonicalName(cardName, cards);
    if (card) {
        return getCardScore(card.id, input);
    } else {
        return 0;
    }
}

function getCardScore(cardId: number, input: Input) {
    if (input.cardCount[cardId]) {
        return input.cardCount[cardId];
    } else {
        return 0;
    }
}

function getCardByCanonicalName(cardName: string, cards: Card[]) {
    for (const card of cards) {
        if (card.canonical_name == cardName) {
            return card;
        }
    }

    return null;
}

export function getScoreLabel(score: number) {
    if (!score) {
        return "";
    }

    // score may be 61.000000001 due to floating point arithmetic
    if (score - Math.floor(score) < 0.01) {
        return Math.floor(score);
    } else {
        return Math.floor(score) + "+";
    }
}
