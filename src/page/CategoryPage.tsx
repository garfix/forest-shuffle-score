import styles from "./CategoryPage.module.css";
import type { User } from "../entity/user";
import Button from "@mui/material/Button";
import { type Category } from "../entity/category";
import React from "react";
import { Breadcrumbs, Chip } from "@mui/material";
import Link from "./component/Link";
import { getCountsByCategory } from "../utils/cards";
import type { Card } from "../entity/card";
import type { Scores } from "../entity/score";
import { categories } from "../utils/categories";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    user: User;
    cards: Card[];
    scores: Scores;
};

export default function CategoryPage({ setPage, setCategory, user, cards, scores }: Props) {
    function select(category: Category) {
        setCategory(category);
        setPage("sort");
    }

    const counts = getCountsByCategory(cards, scores[user.name]);

    return (
        <>
            <Breadcrumbs>
                <Link onClick={() => setPage("user")}>Start</Link>
                <div>{user.name}</div>
            </Breadcrumbs>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <div>{category.name}</div>
                        <Chip label={counts[category.name]}></Chip>
                        <div>
                            <Button onClick={() => select(category)}>Bewerk &gt;</Button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
