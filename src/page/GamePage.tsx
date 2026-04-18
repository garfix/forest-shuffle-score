import Button from "@mui/material/Button";
import styles from "./GamePage.module.css";
import type { User } from "../entity/user";
import React from "react";
import type { Inputs } from "../entity/input";
import { initInputs } from "../utils/scores";
import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import type { Game } from "../entity/game";
import { variants } from "../utils/game";

type Props = {
    users: User[];
    setPage: (page: string) => void;
    setUsers: (user: User[]) => void;
    setInputs: (inputs: Inputs) => void;
    game: Game;
    setGame: (game: Game) => void;
};

export default function GamePage({ users, setUsers, setPage, setInputs, game, setGame }: Props) {
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

    const setSpelVarianten = function (spelVarianten: string[]) {
        const newGame = { ...game };
        newGame.spelVarianten = spelVarianten;
        setGame(newGame);
    };

    return (
        <>
            <div className={styles.below}>
                <Button variant="outlined" onClick={back}>
                    Terug
                </Button>
            </div>
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
            <h2>Varianten</h2>
            <div>
                <FormGroup>
                    {variants.map((variant) => (
                        <FormControlLabel
                            key={variant}
                            control={
                                <Checkbox
                                    checked={game.spelVarianten.includes(variant)}
                                    onChange={(e) => {
                                        const updated = e.target.checked
                                            ? [...game.spelVarianten, variant]
                                            : game.spelVarianten.filter((v) => v !== variant);
                                        setSpelVarianten(updated);
                                    }}
                                />
                            }
                            label={variant}
                        />
                    ))}
                </FormGroup>
            </div>
            <div className={styles.below}>
                <Button variant="contained" color="warning" onClick={newGame}>
                    Start
                </Button>
            </div>
        </>
    );
}
