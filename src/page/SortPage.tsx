import styles from "./SortPage.module.css";
import type { User } from "../entity/user";
import { type Category } from "../entity/category";
import { useMemo } from "react";
import type { Card } from "../entity/card";
import { getCardsByCategory } from "../utils/cards";
import Amount from "./component/Amount";
import type { Scores } from "../entity/score";
import Link from "./component/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    users: User[];
    user: User;
    category: Category;
    cards: Card[];
    scores: Scores;
    setScores: (scores: Scores) => void;
};

export default function SortPage({ setPage, setCategory, user, users, category, cards, scores, setScores }: Props) {
    const getCount = (card: Card) => {
        return scores[user.name].card_count[card.id] ?? 0;
    };

    const setCount = (card: Card, count: number) => {
        const newScores: Scores = { ...scores };
        newScores[user.name] = { ...scores[user.name] };
        newScores[user.name].card_count = { ...scores[user.name].card_count };
        newScores[user.name].card_count[card.id] = count;
        setScores(newScores);
    };

    const categoryCards: Card[] = useMemo(() => getCardsByCategory(cards, category), [category]);

    return (
        <>
            <Breadcrumbs>
                <Link onClick={() => setPage("user")}>Users</Link>
                <Link onClick={() => setPage("category")}>{user.name}</Link>
                <div>{category.name}</div>
            </Breadcrumbs>
            <div className={styles.cards}>
                {categoryCards.map((card) => (
                    <div className={styles.card} key={card.name}>
                        <div className={styles.name}>{card.name}</div>
                        <div>
                            <Amount value={getCount(card)} setValue={(count) => setCount(card, count)} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
