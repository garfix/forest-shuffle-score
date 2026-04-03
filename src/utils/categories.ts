import type { Category } from "../entity/category";

export const categories = [
    {
        name: "Boom",
    },
    {
        name: "Struiken",
    },
    {
        name: "Boven",
    },
    {
        name: "Onder",
    },
    {
        name: "Naast",
    },
    {
        name: "Grot",
    },
];

export function getNextCategory(category: Category) {
    const index = categories.indexOf(category);
    if (index < categories.length - 1) {
        return categories[index + 1];
    }
    return null;
}
