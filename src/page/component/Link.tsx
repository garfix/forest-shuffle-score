import type { ReactNode } from "react";
import styles from "./Link.module.css";

type Props = { children: ReactNode; onClick: () => void };

export default function Link({ children, onClick }: Props) {
    return (
        <span className={styles.link} onClick={onClick}>
            {children}
        </span>
    );
}
