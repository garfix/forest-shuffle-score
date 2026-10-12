import styles from "./Header.module.css";
import tree from "../../assets/tree.png";
import type { ReactNode } from "react";
import { Button } from "@mui/material";

export function Header({ children, setPage }: { children: ReactNode; setPage: (page: string) => void }) {
    return (
        <div className={styles.header}>
            <Button variant="outlined" onClick={() => setPage("user")}>
                <img src={tree} width="48" height="48" className={styles.image} />
            </Button>

            <div className={styles.title}>{children}</div>
        </div>
    );
}
