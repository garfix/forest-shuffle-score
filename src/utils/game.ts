import type { Game } from "../entity/game";

export const variants: string[] = ["Basisspel", "Woodland edge", "Alpine", "Exploration", "Dartmoor", "Exmoor"];

export const defaultGame: Game = {
    spelVarianten: [...variants],
};
