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
        return inputs[user.id].grotCount ?? 0;
    };

    const getGrotCard = () => {
        return inputs[user.id].grotCard ?? "";
    };

    const setGrotCount = (count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.id] = { ...inputs[user.id] };
        newInputs[user.id].grotCount = count;
        setUserInput(newInputs);
    };

    const setGrotCard = (cardName: string) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.id] = { ...inputs[user.id] };
        newInputs[user.id].grotCard = cardName;
        setUserInput(newInputs);
    };

    const exploration = game.spelVarianten.includes("Exploration");
    const dartmoor = game.spelVarianten.includes("Dartmoor");
    const exmoor = game.spelVarianten.includes("Exmoor");

    return (
        <>
            {(exploration || dartmoor) && (
                <div className={styles.card}>
                    <div className={styles.name}>Grotkaart</div>
                    <FormControl size="small" variant="outlined">
                        <InputLabel>Selecteer</InputLabel>
                        <Select value={getGrotCard()} onChange={(event) => setGrotCard(event.target.value)}>
                            <MenuItem value="">Geen</MenuItem>
                            {exploration && <MenuItem value="Smokkelgrot">Smokkelgrot</MenuItem>}
                            {exploration && <MenuItem value="Opslaggrot">Opslaggrot</MenuItem>}
                            {exploration && <MenuItem value="Verlaten grot">Verlaten grot</MenuItem>}
                            {exploration && <MenuItem value="Vleermuizengrot">Vleermuizengrot</MenuItem>}
                            {exploration && <MenuItem value="Spaargrot">Spaargrot</MenuItem>}
                            {dartmoor && <MenuItem value="Grot 1">Grot 1</MenuItem>}
                            {dartmoor && <MenuItem value="Grot 2">Grot 2</MenuItem>}
                            {dartmoor && <MenuItem value="Grot 3">Grot 3</MenuItem>}
                            {dartmoor && <MenuItem value="Grot 4">Grot 4</MenuItem>}
                            {dartmoor && <MenuItem value="Grot 5">Grot 5</MenuItem>}
                            {exmoor && <MenuItem value="Grot 6">Grot 6</MenuItem>}
                            {exmoor && <MenuItem value="Grot 7">Grot 7</MenuItem>}
                            {exmoor && <MenuItem value="Grot 8">Grot 8</MenuItem>}
                            {exmoor && <MenuItem value="Grot 9">Grot 9</MenuItem>}
                            {exmoor && <MenuItem value="Grot 10">Grot 10</MenuItem>}
                        </Select>
                    </FormControl>
                    <div></div>
                </div>
            )}
            <div className={styles.card}>
                <div className={styles.name}>Kaarten in de grot</div>
                <Amount value={getGrotCount()} setValue={(count) => setGrotCount(count)} />
                {scores[user.id].categoryScores["Grot"] || inputs[user.id].grotCount ? (
                    <Chip
                        className={styles.chip}
                        label={getScoreLabel(scores[user.id].categoryScores["Grot"])}
                        color="success"
                    ></Chip>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}
