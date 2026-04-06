import styles from "./ColorCardTable.module.css";
import type { Inputs } from "../../entity/input";
import darkgreen from "./icons/darkgreen.png";
import darkblue from "./icons/darkblue.png";
import lightgreen from "./icons/lightgreen.png";
import lightblue from "./icons/lightblue.png";
import orange from "./icons/orange.png";
import yellow from "./icons/yellow.png";
import purple from "./icons/purple.png";
import brown from "./icons/brown.png";
import pink from "./icons/pink.png";
import sapling from "./icons/sapling.png";
import Amount from "./Amount";
import type { User } from "../../entity/user";

type Props = {
    inputs: Inputs;
    user: User;
    setInputs: (inputs: Inputs) => void;
    colors: string[];
    checks?: boolean[];
    maxChecks?: number;
};

const colorImages: Record<string, string> = {
    yellow: yellow,
    lightgreen: lightgreen,
    darkgreen: darkgreen,
    orange: orange,
    lightblue: lightblue,
    darkblue: darkblue,
    brown: brown,
    purple: purple,
    pink: pink,
    sapling: sapling,
};

export default function ColorCardTable({ inputs, user, setInputs, maxChecks, colors }: Props) {
    const getColorCardCount = (color: string) => {
        return inputs[user.name].colorCardCount[color] ?? 0;
    };
    const setColorCardCount = (color: string, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].colorCardCount = { ...inputs[user.name].colorCardCount };
        newInputs[user.name].colorCardCount[color] = count;

        setInputs(newInputs);
    };
    return (
        <>
            {colors.map((color) => (
                <div className={styles.row}>
                    <img src={colorImages[color]} height="32" />
                    <Amount
                        buttonColor="info"
                        valueColor="error"
                        value={getColorCardCount(color)}
                        setValue={(count) => {
                            setColorCardCount(color, count);
                        }}
                    />
                    <div></div>
                </div>
            ))}
        </>
    );
}
