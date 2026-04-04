import styles from "./CategoryPage.module.css";
import type { User } from "../entity/user";
import Button from "@mui/material/Button";
import { type Category } from "../entity/category";
import React from "react";
import { Chip } from "@mui/material";
import Link from "./component/Link";
import { getCountsByCategory } from "../utils/cards";
import type { Card } from "../entity/card";
import { categories } from "../utils/categories";
import type { Inputs } from "../entity/input";
import type { Scores } from "../entity/score";
import { getScoreLabel } from "../utils/scores";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    user: User;
    cards: Card[];
    inputs: Inputs;
    scores: Scores;
};

export default function CategoryPage({ setPage, setCategory, user, cards, inputs, scores }: Props) {
    function select(category: Category) {
        setCategory(category);
        setPage("sort");
    }

    const counts = getCountsByCategory(cards, inputs[user.name]);

    return (
        <>
            <div>
                <Link onClick={() => setPage("user")}>Start</Link> &nbsp;/&nbsp; <span>{user.name}</span>
            </div>
            <div className={styles.categories}>
                <div></div>
                <div>Kaarten</div>
                <div>Score</div>
                <div></div>
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <div className={styles.label}>{category.name}</div>
                        <Chip className={styles.chip} label={counts[category.name]} color="info"></Chip>
                        <Chip
                            className={styles.chip}
                            label={getScoreLabel(scores[user.name].categoryScores[category.name])}
                            color="success"
                        ></Chip>
                        <Button onClick={() => select(category)}>Bewerk</Button>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
