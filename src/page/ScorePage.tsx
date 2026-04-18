import { Button, Chip } from "@mui/material";
import styles from "./ScorePage.module.css";
import type { User } from "../entity/user";
import { getCategories } from "../utils/categories";
import type { Game } from "../entity/game";
import React from "react";
import type { Scores } from "../entity/score";
import { getScoreLabel } from "../utils/scores";
import { activeUsers } from "../utils/users";

type Props = { setPage: (page: string) => void; users: User[]; game: Game; scores: Scores };

export default function Home({ setPage, users, game, scores }: Props) {
    const categories = getCategories(game);

    const theUsers = activeUsers(users);
    const tableStyle = { gridTemplateColumns: "1fr ".repeat(theUsers.length + 1) };

    return (
        <>
            <div>
                <Button variant="outlined" onClick={() => setPage("user")}>
                    Start
                </Button>
            </div>
            <div className={styles.scores} style={tableStyle}>
                <div></div>
                {theUsers.map((user) => (
                    <div key={user.id}>{user.name}</div>
                ))}
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <div className={styles.label}>{category.name}</div>
                        {theUsers.map((user) => (
                            <Chip
                                className={styles.chip}
                                color="success"
                                label={getScoreLabel(scores[user.id].categoryScores[category.name])}
                            />
                        ))}
                    </React.Fragment>
                ))}
                <React.Fragment key={"total"}>
                    <div className={styles.label}>Totaal</div>
                    {theUsers.map((user) => (
                        <Chip className={styles.chip} color="warning" label={getScoreLabel(scores[user.id].total)} />
                    ))}
                </React.Fragment>
            </div>
        </>
    );
}
