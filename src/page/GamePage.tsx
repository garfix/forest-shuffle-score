import Button from "@mui/material/Button";
import styles from "./GamePage.module.css";
import type { User } from "../entity/user";
import React from "react";
import type { Scores } from "../entity/score";
import type { Inputs } from "../entity/input";
import { initInputs } from "../utils/scores";
import { TextField } from "@mui/material";

type Props = {
    users: User[];
    scores: Scores;
    setPage: (page: string) => void;
    setUsers: (user: User[]) => void;
    inputs: Inputs;
    setInputs: (inputs: Inputs) => void;
};

export default function GamePage({ users, setUsers, scores, setPage, inputs, setInputs }: Props) {
    const updateUserName = function (index: number, name: string) {
        const newUsers: User[] = users.slice(0);
        newUsers[index] = { ...users[index] };
        newUsers[index].name = name;
        setUsers(newUsers);
    };

    const newGame = () => {
        setInputs(initInputs(users));
        setPage("user");
    };

    const back = () => {
        setPage("user");
    };

    return (
        <>
            <h2>Spelers</h2>
            <div>
                {users.map((user, index) => (
                    <React.Fragment key={user.id}>
                        <div className={styles.player}>
                            <TextField
                                label={"Speler " + (index + 1)}
                                variant="outlined"
                                size="small"
                                value={user.name}
                                onChange={(event) => updateUserName(index, event.target.value)}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.below}>
                <Button onClick={back}>Terug</Button>
                <Button variant="contained" color="warning" onClick={newGame}>
                    Start
                </Button>
            </div>
        </>
    );
}
