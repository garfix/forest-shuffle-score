import type { User } from "../entity/user";

export const defaultUsers = [
    { name: "Patrick", id: 1 },
    { name: "Katja", id: 2 },
    { name: "", id: 3 },
    { name: "", id: 4 },
    { name: "", id: 5 },
];

export function activeUsers(users: User[]) {
    return users.filter((user) => user.name.trim() != "");
}
