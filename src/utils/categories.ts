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
        name: "Grot",
        spel_variant: [],
    },
];

export function getCategories(game: Game) {
    return categories.filter(
        (c) => c.spel_variant.length === 0 || game.spelVarianten.filter((v) => c.spel_variant.includes(v)).length > 0,
    );
}

export function getNextCategory(category: Category) {
    const index = categories.indexOf(category);
    if (index < categories.length - 1) {
        return categories[index + 1];
    }
    return null;
}
