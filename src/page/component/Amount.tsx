import Button from "@mui/material/Button";
import styles from "./Amount.module.css";
import { Chip } from "@mui/material";

type Props = {
    value: number;
    setValue: (value: number) => void;
    valueColor?: "primary" | "error" | "warning" | "info" | "secondary" | "success" | "default" | undefined;
    buttonColor?: "primary" | "error" | "warning" | "info" | "inherit" | "secondary" | "success" | undefined;
    max?: number;
};

export default function Amount({ value, setValue, valueColor = "warning", buttonColor = "primary", max }: Props) {
    function inc() {
        setValue(value + 1);
    }
    function dec() {
        if (value > 0) {
            setValue(value - 1);
        }
    }

    return (
        <div className={styles.buttons}>
            <Button
                variant="contained"
                onClick={dec}
                className={styles.button}
                color={buttonColor}
                disabled={value <= 0}
            >
                -1
            </Button>
            <Chip className={styles.chip} label={value} color={valueColor} />
            <Button
                variant="contained"
                onClick={inc}
                className={styles.button}
                color={buttonColor}
                disabled={!!max && value >= max}
            >
                +1
            </Button>
        </div>
    );
}
