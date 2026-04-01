import type { Scores } from "../entity/score";
import type { User } from "../entity/user";

export function initScores(users: User[]) {
    const scores: Scores = {};
    for (const user of users) {
        scores[user.name] = { card_count: {} };
    }
    return scores;
}
