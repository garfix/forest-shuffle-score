import type { ReactNode } from "react";
import styles from "./SortColor.module.css";

type Props = { sort: string; children: ReactNode };

const colors: Record<string, string> = {
    Vogel: "#3eb5e8",
    Vlinder: "#8d4f92",
    Pootdier: "#aa6338",
    Struiken: "#668346",
    Amfibie: "#ccc",
    Plant: "#478754",
    "Evenhoevig dier": "#7d6447",
    Insect: "#5e9a84",
    Hert: "#b9a33e",
    Vleermuis: "#15110e",
    Boom: "#bbd767",
    Paddenstoel: "#79391c",
    Libel: "#b873b8",
    Vis: "#030583",
    Rivier: "#49659c",
    Generiek: "#777",
    Heide: "#77c3bd",
};

export default function SortColor({ sort, children }: Props) {
    const color = colors[sort];
    return (
        <div className={styles.component} style={{ background: color }}>
            {children}
        </div>
    );
}
