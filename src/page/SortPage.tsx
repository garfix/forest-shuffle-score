import styles from "./SortPage.module.css";
import type { User } from "../entity/user";
import { type Category } from "./data/category";
import { useMemo } from "react";
import type { Card } from "./data/card";
import { getCardsByCategory } from "../utils/cards";
import Amount from "./component/Amount";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    user: User;
    category: Category;
    cards: Card[];
};

export default function SortPage({ setPage, setCategory, user, category, cards }: Props) {
    function select(category: Category) {
        setCategory(category);
        setPage("sort");
    }

    const categoryCards: Card[] = useMemo(() => getCardsByCategory(cards, category), [category]);

    return (
        <>
            <h2>
                {user.name} &gt; {category.name}
            </h2>
            <div className={styles.cards}>
                {categoryCards.map((card) => (
                    <div className={styles.card} key={card.name}>
                        <div className={styles.name}>{card.name}</div>
                        <div>
                            <Amount value={1} setValue={() => {}} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
