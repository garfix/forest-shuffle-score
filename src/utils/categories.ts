import type { Category } from "../entity/category";
import type { Game } from "../entity/game";

const categories: Category[] = [
    {
        name: "Boom",
        spel_variant: [],
    },
    {
        name: "Struiken",
        spel_variant: ["Woodland edge", "Dartmoor"],
    },
    {
        name: "Heide",
        spel_variant: ["Dartmoor"],
    },
    {
        name: "Rivier",
        spel_variant: ["Smoky mountains"],
    },
    {
        name: "Boven",
        spel_variant: [],
    },
    {
        name: "Onder",
        spel_variant: [],
    },
    {
        name: "Naast",
        spel_variant: [],
    },
    {
        name: "Extra",
        spel_variant: [],
    },
];

export function getCategories(game: Game) {
    return categories.filter(
        (c) => c.spel_variant.length === 0 || game.spelVarianten.filter((v) => c.spel_variant.includes(v)).length > 0,
    );
}

export function getNextCategory(category: Category, game: Game) {
    const c = getCategories(game);
    const index = c.indexOf(category);
    if (index < c.length - 1) {
        return c[index + 1];
    }
    return null;
}
