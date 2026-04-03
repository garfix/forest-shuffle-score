export type Input = {
    cardCount: Record<number, number>; // card id, count
    cardSubCount: Record<number, number>; // card id, count (sub questions)
    grotCount: number;
};

export type Inputs = Record<string, Input>;
