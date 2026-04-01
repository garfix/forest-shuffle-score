export type Score = {
    card_count: Record<number, number>; // card id, count
    total: number;
};

export type Scores = Record<string, Score>;
