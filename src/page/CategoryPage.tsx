import styles from "./CategoryPage.module.css";
import type { User } from "../entity/user";
import Button from "@mui/material/Button";
import { type Category } from "../entity/category";
import React from "react";
import { Breadcrumbs, Chip } from "@mui/material";
import Link from "./component/Link";
import { getCountsByCategory } from "../utils/cards";
import type { Card } from "../entity/card";
import { categories } from "../utils/categories";
import type { Inputs } from "../entity/input";
import type { Scores } from "../entity/score";

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
            <Breadcrumbs>
                <Link onClick={() => setPage("user")}>Start</Link>
                <div>{user.name}</div>
            </Breadcrumbs>
            <div className={styles.categories}>
                <div></div>
                <div>Kaarten</div>
                <div>Score</div>
                <div></div>
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <div>{category.name}</div>
                        <Chip label={counts[category.name]}></Chip>
                        <Chip label={scores[user.name].categoryScores[category.name]} color="success"></Chip>
                        <div>
                            <Button onClick={() => select(category)}>Bewerk &gt;</Button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
