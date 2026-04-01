export type Score = {
    card_count: Record<number, number>; // card id, count
};

export type Scores = Record<string, Score>;
