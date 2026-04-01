import styles from "./SortPage.module.css";
import type { User } from "../entity/user";
import { type Category } from "../entity/category";
import { useMemo } from "react";
import type { Card } from "../entity/card";
import { getCategoryCards } from "../utils/cards";
import Amount from "./component/Amount";
import type { Scores } from "../entity/score";
import Link from "./component/Link";
import { getNextCategory } from "../utils/categories";
import type { Inputs } from "../entity/input";
import Chip from "@mui/material/Chip";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    users: User[];
    user: User;
    category: Category;
    cards: Card[];
    inputs: Inputs;
    scores: Scores;
    setUserInput: (inputs: Inputs) => void;
};

export default function SortPage({ setPage, setCategory, user, scores, category, cards, inputs, setUserInput }: Props) {
    const getCount = (card: Card) => {
        return inputs[user.name].cardCount[card.id] ?? 0;
    };

    const setCount = (card: Card, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].cardCount = { ...inputs[user.name].cardCount };
        newInputs[user.name].cardCount[card.id] = count;
        setUserInput(newInputs);
    };

    const nextCategory = getNextCategory(category);

    const next = () => {
        if (nextCategory) {
            setCategory(nextCategory);
        }
    };

    const categoryCards: Card[] = useMemo(() => getCategoryCards(cards, category), [category]);

    return (
        <>
            <div>
                <Link onClick={() => setPage("user")}>Start</Link> /
                <Link onClick={() => setPage("category")}>{user.name}</Link> / <span>{category.name}</span>
            </div>
            <div className={styles.cards}>
                {categoryCards.map((card) => (
                    <div className={styles.card} key={card.id}>
                        <div className={styles.name}>{card.name}</div>
                        <Amount value={getCount(card)} setValue={(count) => setCount(card, count)} />
                        <Chip label={scores[user.name].cardScores[card.id]} color="success"></Chip>
                    </div>
                ))}
            </div>
            {nextCategory && <Link onClick={next}>Volgende</Link>}
        </>
    );
}
