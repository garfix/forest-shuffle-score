import Button from "@mui/material/Button";
import styles from "./UserPage.module.css";
import type { User } from "../entity/user";
import React from "react";
import type { Scores } from "../entity/score";
import Chip from "@mui/material/Chip";
import { getCountsByUser } from "../utils/cards";
import type { Inputs } from "../entity/input";
import { initInputs } from "../utils/scores";

type Props = {
    users: User[];
    scores: Scores;
    setPage: (page: string) => void;
    setUser: (user: User) => void;
    inputs: Inputs;
    setInputs: (inputs: Inputs) => void;
};

export default function UserPage({ users, setUser, scores, setPage, inputs, setInputs }: Props) {
    const select = (user: User) => {
        setUser(user);
        setPage("category");
    };

    const counts = getCountsByUser(inputs);

    const newGame = () => {
        setInputs(initInputs(users));
    };

    return (
        <>
            <div className={styles.users}>
                <div></div>
                <div>Kaarten</div>
                <div>Score</div>
                <div></div>
                {users.map((user) => (
                    <React.Fragment key={user.name}>
                        <div className={styles.label}>{user.name}</div>
                        <Chip className={styles.chip} label={counts[user.name]} color="info" />
                        <Chip className={styles.chip} color="success" label={scores[user.name].total} />
                        <Button className={styles.button} onClick={() => select(user)}>
                            Bewerk
                        </Button>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.below}>
                <Button variant="contained" color="warning" onClick={newGame}>
                    Nieuw spel
                </Button>
            </div>
        </>
    );
}
