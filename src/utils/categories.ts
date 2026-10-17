import type { Category } from "../entity/category";
import type { Game } from "../entity/game";

const categories: Category[] = [
    {
        name: "Boom",
        title: "Boom",
        spel_variant: [],
    },
    {
        name: "Struiken",
        title: "Struik",
        spel_variant: ["Woodland edge", "Dartmoor"],
    },
    {
        name: "Heide",
        title: "Heide",
        spel_variant: ["Dartmoor"],
    },
    {
        name: "Rivier",
        title: "Rivier",
        spel_variant: ["Smoky mountains"],
    },
    {
        name: "Boven",
        title: "Boven",
        spel_variant: [],
    },
    {
        name: "Onder",
        title: "Onder",
        spel_variant: [],
    },
    {
        name: "Naast",
        title: "Naast",
        spel_variant: [],
    },
    {
        name: "Grot",
        title: "Extra",
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
