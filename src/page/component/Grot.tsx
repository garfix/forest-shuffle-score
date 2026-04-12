import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Inputs } from "../../entity/input";
import type { User } from "../../entity/user";
import Amount from "./Amount";
import type { Scores } from "../../entity/score";
import styles from "./Grot.module.css";
import type { Game } from "../../entity/game";
import { getScoreLabel } from "../../utils/scores";

type Props = {
    user: User;
    inputs: Inputs;
    setUserInput: (inputs: Inputs) => void;
    scores: Scores;
    game: Game;
};

export default function Grot({ user, inputs, setUserInput, scores, game }: Props) {
    const getGrotCount = () => {
        return inputs[user.name].grotCount ?? 0;
    };

    const getGrotCard = () => {
        return inputs[user.name].grotCard ?? "";
    };

    const setGrotCount = (count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].grotCount = count;
        setUserInput(newInputs);
    };

    const setGrotCard = (cardName: string) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].grotCard = cardName;
        setUserInput(newInputs);
    };
    return (
        <>
            {game.spelVarianten.includes("Exploration") && (
                <div className={styles.card}>
                    <div className={styles.name}>Grotkaart</div>
                    <FormControl size="small" variant="outlined">
                        <InputLabel>Selecteer</InputLabel>
                        <Select value={getGrotCard()} onChange={(event) => setGrotCard(event.target.value)}>
                            <MenuItem value="">Geen</MenuItem>
                            <MenuItem value="Smokkelgrot">Smokkelgrot</MenuItem>
                            <MenuItem value="Opslaggrot">Opslaggrot</MenuItem>
                            <MenuItem value="Verlaten grot">Verlaten grot</MenuItem>
                            <MenuItem value="Vleermuizengrot">Vleermuizengrot</MenuItem>
                            <MenuItem value="Spaargrot">Spaargrot</MenuItem>
                        </Select>
                    </FormControl>
                    <div></div>
                </div>
            )}
            <div className={styles.card}>
                <div className={styles.name}>Kaarten in de grot</div>
                <Amount value={getGrotCount()} setValue={(count) => setGrotCount(count)} />
                <Chip
                    className={styles.chip}
                    label={getScoreLabel(scores[user.name].categoryScores["Grot"])}
                    color="success"
                ></Chip>
            </div>
        </>
    );
}
