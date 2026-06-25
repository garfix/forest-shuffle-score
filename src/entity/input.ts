export type Input = {
    cardCount: Record<number, number>; // card id, count
    cardSubCount: Record<number, number>; // card id, count (sub questions)
    dekenveenCount: Record<number, number>; // amount below Dekenveen
    kustheideCount: Record<number, number>; // amount above and below Kustheide
    grotCard: string;
    grotCount: number;
    colorCardCount: Record<string, number>;
    colorCardChecks: Record<number, string[]>;
};

export type Inputs = Record<number, Input>;
