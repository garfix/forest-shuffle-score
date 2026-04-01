import Button from "@mui/material/Button";
import styles from "./Amount.module.css";
import { Chip } from "@mui/material";

type Props = { value: number; setValue: (value: number) => void };

export default function Amount({ value, setValue }: Props) {
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
            <Chip label={value} />
            <Button variant="contained" onClick={dec}>
                -1
            </Button>
            <Button variant="contained" onClick={inc}>
                +1
            </Button>
        </div>
    );
}
