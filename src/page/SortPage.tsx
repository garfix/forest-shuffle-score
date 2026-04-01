import styles from "./SortPage.module.css";
import type { User } from "../entity/user";
import { type Category } from "../entity/category";
import { useMemo } from "react";
import type { Card } from "../entity/card";
import { getCategoryCards } from "../utils/cards";
import Amount from "./component/Amount";
import type { Scores } from "../entity/score";
import Link from "./component/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { getNextCategory } from "../utils/categories";
import type { Inputs } from "../entity/input";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    users: User[];
    user: User;
    category: Category;
    cards: Card[];
    inputs: Inputs;
    setUserInput: (inputs: Inputs) => void;
};

export default function SortPage({ setPage, setCategory, user, users, category, cards, inputs, setUserInput }: Props) {
    const getCount = (card: Card) => {
        return inputs[user.name].card_count[card.id] ?? 0;
    };

    const setCount = (card: Card, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].card_count = { ...inputs[user.name].card_count };
        newInputs[user.name].card_count[card.id] = count;
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
            <Breadcrumbs>
                <Link onClick={() => setPage("user")}>Start</Link>
                <Link onClick={() => setPage("category")}>{user.name}</Link>
                <div>{category.name}</div>
            </Breadcrumbs>
            <div className={styles.cards}>
                {categoryCards.map((card) => (
                    <div className={styles.card} key={card.id}>
                        <div className={styles.name}>{card.name}</div>
                        <div>
                            <Amount value={getCount(card)} setValue={(count) => setCount(card, count)} />
                        </div>
                    </div>
                ))}
            </div>
            {nextCategory && <Link onClick={next}>Volgende</Link>}
        </>
    );
}
