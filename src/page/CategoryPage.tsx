import styles from "./CategoryPage.module.css";
import type { User } from "../entity/user";
import Button from "@mui/material/Button";
import { categories, type Category } from "../entity/category";
import React from "react";

type Props = { setPage: (page: string) => void; setCategory: (category: Category) => void; user: User };

export default function CategoryPage({ setPage, setCategory, user }: Props) {
    function select(category: Category) {
        setCategory(category);
        setPage("sort");
    }

    return (
        <>
            <h2>{user.name}</h2>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <div>{category.name}</div>
                        <div>
                            <Button onClick={() => select(category)}>Bewerk &gt;</Button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
