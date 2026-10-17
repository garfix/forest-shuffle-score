import styles from "./ColorCardTable.module.css";
import type { Inputs } from "../../entity/input";
import type { User } from "../../entity/user";
import { Checkbox } from "@mui/material";
import type { Card } from "../../entity/card";
import { colorImages } from "../../utils/images";

type Props = {
    inputs: Inputs;
    user: User;
    setInputs: (inputs: Inputs) => void;
    colors: string[];
    card: Card;
    maxChecks?: number;
};

export default function ColorCardTable({ inputs, user, setInputs, card, maxChecks, colors }: Props) {
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
        <div className={styles.checks}>
            {colors.map((color) => (
                <span key={color} className={styles.label}>
                    <img src={colorImages[color]} height="32" />
                    {!!maxChecks && (
                        <Checkbox
                            checked={isColorCardChecked(card, color)}
                            onChange={(event) => {
                                setColorCardChecked(color, !!event.target.value);
                            }}
                            disabled={checkForDisabled(color)}
                        />
                    )}
                </span>
            ))}
        </div>
    );
}
