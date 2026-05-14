import type { Game } from "../entity/game";

export const variants: string[] = ["Basisspel", "Woodland edge", "Alpine", "Exploration", "Dartmoor"];

export const defaultGame: Game = {
    spelVarianten: [...variants],
};
