export type Input = {
    cardCount: Record<number, number>; // card id, count
    cardSubCount: Record<number, number>; // card id, count (sub questions)
    grotCard: string;
    grotCount: number;
    colorCardCount: Record<string, number>;
};

export type Inputs = Record<string, Input>;
