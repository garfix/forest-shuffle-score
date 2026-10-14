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
import darkyellow from "./icons/darkyellow.png";
import Amount from "./Amount";
import type { User } from "../../entity/user";
import darkblue2 from "./icons/darkblue2.png";
import greyblue from "./icons/greyblue.png";
import greyblue2 from "./icons/greyblue2.png";
import oldpink from "./icons/oldpink.png";
import red from "./icons/oldpink.png"; // todo: replace with red icon

type Props = {
    inputs: Inputs;
    user: User;
    setInputs: (inputs: Inputs) => void;
    colors: string[];
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
    darkyellow: darkyellow,
    darkblue2: darkblue2,
    greyblue: greyblue,
    greyblue2: greyblue2,
    oldpink: oldpink,
    red: red,
};

export default function SelectedColorCardTable({ inputs, user, setInputs, colors }: Props) {
    const getColorCardCount = (color: string) => {
        return inputs[user.id].colorCardCount[color] ?? 0;
    };

    const setColorCardCount = (color: string, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.id] = { ...inputs[user.id] };
        newInputs[user.id].colorCardCount = { ...inputs[user.id].colorCardCount };
        newInputs[user.id].colorCardCount[color] = count;

        setInputs(newInputs);
    };

    return (
        <>
            {colors.length > 0 ? (
                colors.map((color) => (
                    <div className={styles.row} key={color}>
                        <div className={styles.label}>
                            <img src={colorImages[color]} height="32" />
                        </div>
                        <Amount
                            buttonColor="info"
                            valueColor="secondary"
                            value={getColorCardCount(color)}
                            setValue={(count) => {
                                setColorCardCount(color, count);
                            }}
                        />
                    </div>
                ))
            ) : (
                <p>Geen</p>
            )}
        </>
    );
}
