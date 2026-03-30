import styles from "./CategoryPage.module.css";
import type { User } from "../entity/user";
import Button from "@mui/material/Button";
import { categories, type Category } from "./data/category";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    user: User;
    category: Category;
};

export default function SortPage({ setPage, setCategory, user, category }: Props) {
    function select(category: Category) {
        setCategory(category);
        setPage("sort");
    }

    return (
        <>
            <h2>
                {user.name} &gt; {category.name}
            </h2>
            <div className={styles.categories}></div>
        </>
    );
}
