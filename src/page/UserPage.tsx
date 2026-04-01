import Button from "@mui/material/Button";
import styles from "./UserPage.module.css";
import type { User } from "../entity/user";
import React from "react";
import type { Scores } from "../entity/score";
import Chip from "@mui/material/Chip";
import { getCountsByUser } from "../utils/cards";
import type { Inputs } from "../entity/input";

type Props = {
    users: User[];
    scores: Scores;
    setPage: (page: string) => void;
    setUser: (user: User) => void;
    inputs: Inputs;
};

export default function UserPage({ users, setUser, scores, setPage, inputs }: Props) {
    const select = (user: User) => {
        setUser(user);
        setPage("category");
    };

    const counts = getCountsByUser(inputs);

    return (
        <>
            <div className={styles.users}>
                <div></div>
                <div>Kaarten</div>
                <div>Score</div>
                <div></div>
                {users.map((user) => (
                    <React.Fragment key={user.name}>
                        <div>{user.name}</div>
                        <Chip label={counts[user.name]} />
                        <Chip color="success" label={scores[user.name].total} />
                        <div>
                            <Button onClick={() => select(user)}>Bewerk &gt;</Button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
