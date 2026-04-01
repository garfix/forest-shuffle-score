export type Score = {
    total: number;
    cardScores: Record<number, number>; // card id, score
    categoryScores: Record<string, number>; // category name, score
};

export type Scores = Record<string, Score>;
