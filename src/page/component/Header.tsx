import styles from "./Header.module.css";
import tree from "../../assets/tree.png";
import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { acornImage } from "../../utils/images";
import { getScoreLabel } from "../../utils/scores";

export function Header({
    children,
    setPage,
    score,
}: {
    children: ReactNode;
    setPage: (page: string) => void;
    score?: number;
}) {
    return (
        <div className={styles.header}>
            <Button variant="outlined" onClick={() => setPage("user")}>
                <img src={tree} width="48" height="48" className={styles.image} />
            </Button>

            <div className={styles.title}>{children}</div>
            {!!score && (
                <div className={styles.score}>
                    <span>{getScoreLabel(score)}</span> <img src={acornImage} width="16" />
                </div>
            )}
        </div>
    );
}
