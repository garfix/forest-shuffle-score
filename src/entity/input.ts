export type Input = {
    cardCount: Record<number, number>; // card id, count
    cardSubCount: Record<number, number>; // card id, count (sub questions)
};

export type Inputs = Record<string, Input>;
