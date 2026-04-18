import type { Game } from "../entity/game";

export const variants: string[] = ["Woodland edge", "Alpine", "Exploration"];

export const defaultGame: Game = {
    spelVarianten: ["Basisspel", ...variants],
};
