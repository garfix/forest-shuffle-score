import Button from "@mui/material/Button";
import { Chip, Link } from "@mui/material";
import styles from "./ScorePage.module.css";
import type { User } from "../entity/user";
import { getCategories } from "../utils/categories";
import type { Game } from "../entity/game";
import React from "react";
import type { Scores } from "../entity/score";

type Props = { setPage: (page: string) => void; users: User[]; game: Game; scores: Scores };

export default function Home({ setPage, users, game, scores }: Props) {
    const categories = getCategories(game);

    return (
        <>
            <div>
                <Link onClick={() => setPage("user")}>Start</Link>
            </div>
            <div className={styles.scores}>
                <div></div>
                {users.map((user) => (
                    <div>{user.name}</div>
                ))}
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <div className={styles.label}>{category.name}</div>
                        {users.map((user) => (
                            <Chip
                                className={styles.chip}
                                color="success"
                                label={scores[user.name].categoryScores[category.name]}
                            />
                        ))}
                    </React.Fragment>
                ))}
                <React.Fragment key={"total"}>
                    <div className={styles.label}>Totaal</div>
                    {users.map((user) => (
                        <Chip className={styles.chip} color="warning" label={scores[user.name].total} />
                    ))}
                </React.Fragment>
            </div>
        </>
    );
}
