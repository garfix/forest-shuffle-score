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
import Amount from "./Amount";
import type { User } from "../../entity/user";
import { Checkbox } from "@mui/material";
import type { Card } from "../../entity/card";

type Props = {
    inputs: Inputs;
    user: User;
    setInputs: (inputs: Inputs) => void;
    colors: string[];
    card: Card;
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
};

export default function ColorCardTable({ inputs, user, setInputs, card, maxChecks, colors }: Props) {
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

    const isColorCardChecked = (card: Card, color: string) => {
        if (inputs[user.id].colorCardChecks[card.id]) {
            return inputs[user.id].colorCardChecks[card.id].includes(color);
        }
        return false;
    };

    const setColorCardChecked = (color: string, checked: boolean) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.id] = { ...inputs[user.id] };
        newInputs[user.id].colorCardChecks = { ...inputs[user.id].colorCardChecks };
        if (!newInputs[user.id].colorCardChecks[card.id]) {
            newInputs[user.id].colorCardChecks[card.id] = [];
        }
        if (checked && !newInputs[user.id].colorCardChecks[card.id].includes(color)) {
            newInputs[user.id].colorCardChecks[card.id].push(color);
        } else {
            newInputs[user.id].colorCardChecks[card.id] = newInputs[user.id].colorCardChecks[card.id].filter(
                (x) => x !== color,
            );
        }

        setInputs(newInputs);
    };

    const checkForDisabled = (color: string) => {
        if (maxChecks == undefined) {
            return false;
        }
        if (
            inputs[user.id].colorCardChecks[card.id] &&
            inputs[user.id].colorCardChecks[card.id].length >= maxChecks &&
            !inputs[user.id].colorCardChecks[card.id].includes(color)
        ) {
            return true;
        }
    };

    return (
        <>
            {colors.map((color) => (
                <div className={styles.row} key={color}>
                    <div className={styles.label}>
                        {!!maxChecks && (
                            <Checkbox
                                checked={isColorCardChecked(card, color)}
                                onChange={(event) => {
                                    setColorCardChecked(color, !!event.target.value);
                                }}
                                disabled={checkForDisabled(color)}
                            />
                        )}
                        <img src={colorImages[color]} height="32" />
                    </div>
                    {!maxChecks || isColorCardChecked(card, color) ? (
                        <Amount
                            buttonColor="info"
                            valueColor="error"
                            value={getColorCardCount(color)}
                            setValue={(count) => {
                                setColorCardCount(color, count);
                            }}
                        />
                    ) : (
                        <div></div>
                    )}
                    <div></div>
                </div>
            ))}
        </>
    );
}
