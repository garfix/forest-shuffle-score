import Button from "@mui/material/Button";
import styles from "./UserPage.module.css";
import type { User } from "../entity/user";
import React from "react";
import type { Scores } from "../entity/score";
import Chip from "@mui/material/Chip";
import { getCountsByUser } from "../utils/cards";
import type { Inputs } from "../entity/input";
import { getScoreLabel } from "../utils/scores";
import { activeUsers } from "../utils/users";

type Props = {
    users: User[];
    scores: Scores;
    setPage: (page: string) => void;
    setUser: (user: User) => void;
    inputs: Inputs;
    setInputs: (inputs: Inputs) => void;
};

export default function UserPage({ users, setUser, scores, setPage, inputs }: Props) {
    const select = (user: User) => {
        setUser(user);
        setPage("category");
    };

    const toScores = () => {
        setPage("scores");
    };

    const counts = getCountsByUser(inputs);

    const newGame = () => {
        setPage("game");
    };

    return (
        <>
            <div className={styles.users}>
                <div></div>
                <div>Kaarten</div>
                <div>Score</div>
                <div></div>
                {activeUsers(users).map((user) => (
                    <React.Fragment key={user.id}>
                        <div className={styles.label}>{user.name}</div>
                        <Chip className={styles.chip} label={counts[user.id]} color="info" />
                        <Chip className={styles.chip} color="success" label={getScoreLabel(scores[user.id].total)} />
                        <Button variant="outlined" className={styles.button} onClick={() => select(user)}>
                            Bewerk
                        </Button>
                    </React.Fragment>
                ))}
            </div>
            <div>
                <Button variant="outlined" className={styles.button} onClick={() => toScores()}>
                    Score overzicht
                </Button>
            </div>
            <div className={styles.below}>
                <Button variant="contained" color="warning" onClick={newGame}>
                    Nieuw spel
                </Button>
            </div>
        </>
    );
}
