import styles from "./ColorCardTable.module.css";
import type { Inputs } from "../../entity/input";
import Amount from "./Amount";
import type { User } from "../../entity/user";
import { colorImages } from "../../utils/images";

type Props = {
    inputs: Inputs;
    user: User;
    setInputs: (inputs: Inputs) => void;
    colors: string[];
    maxChecks?: number;
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
