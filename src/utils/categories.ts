import type { Category } from "../entity/category";
import type { Game } from "../entity/game";

const categories: Category[] = [
    {
        name: "Boom",
        spel_variant: "Basisspel",
    },
    {
        name: "Struiken",
        spel_variant: "Woodland edge",
    },
    {
        name: "Boven",
        spel_variant: "Basisspel",
    },
    {
        name: "Onder",
        spel_variant: "Basisspel",
    },
    {
        name: "Naast",
        spel_variant: "Basisspel",
    },
    {
        name: "Grot",
        spel_variant: "Basisspel",
    },
];

export function getCategories(game: Game) {
    return categories.filter((c) => game.spelVarianten.includes(c.spel_variant));
}

export function getNextCategory(category: Category) {
    const index = categories.indexOf(category);
    if (index < categories.length - 1) {
        return categories[index + 1];
    }
    return null;
}
