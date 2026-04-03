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
import React from "react";

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

    const getSubCount = (card: Card) => {
        return inputs[user.name].cardSubCount[card.id] ?? 0;
    };

    const getGrotCount = () => {
        return inputs[user.name].grotCount ?? 0;
    };

    const setCount = (card: Card, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].cardCount = { ...inputs[user.name].cardCount };
        newInputs[user.name].cardCount[card.id] = count;
        setUserInput(newInputs);
    };

    const setSubCount = (card: Card, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].cardSubCount = { ...inputs[user.name].cardSubCount };
        newInputs[user.name].cardSubCount[card.id] = count;
        setUserInput(newInputs);
    };

    const setGrotCount = (count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.name] = { ...inputs[user.name] };
        newInputs[user.name].grotCount = count;
        setUserInput(newInputs);
    };

    const nextCategory = getNextCategory(category);

    const next = () => {
        if (nextCategory) {
            setCategory(nextCategory);
            window.scrollTo(0, 0);
        }
    };

    const done = () => {
        setPage("category");
    };

    const categoryCards: Card[] = useMemo(() => getCategoryCards(cards, category), [category]);

    return (
        <>
            <div>
                <Link onClick={() => setPage("user")}>Start</Link> &nbsp;/&nbsp;
                <Link onClick={() => setPage("category")}>{user.name}</Link> &nbsp;/&nbsp; <span>{category.name}</span>
            </div>
            <div className={styles.cards}>
                {category.name == "Grot" ? (
                    <>
                        <div className={styles.card}>
                            <div className={styles.name}>Kaarten in de grot</div>
                            <Amount value={getGrotCount()} setValue={(count) => setGrotCount(count)} />
                            <Chip
                                className={styles.chip}
                                label={scores[user.name].categoryScores["Grot"]}
                                color="success"
                            ></Chip>
                        </div>
                    </>
                ) : (
                    categoryCards.map((card) => (
                        <React.Fragment key={card.id}>
                            <div className={styles.card}>
                                <div className={styles.name}>{card.name}</div>
                                <Amount value={getCount(card)} setValue={(count) => setCount(card, count)} />
                                <Chip
                                    className={styles.chip}
                                    label={scores[user.name].cardScores[card.id]}
                                    color="success"
                                ></Chip>
                            </div>
                            {card.sub_question && !!getCount(card) && (
                                <div className={styles.card}>
                                    <div className={styles.name}>
                                        <b>&nbsp;&nbsp;&gt; {card.sub_question}</b>
                                    </div>
                                    <Amount
                                        buttonColor="info"
                                        valueColor="error"
                                        value={getSubCount(card)}
                                        setValue={(count) => setSubCount(card, count)}
                                    />
                                    <div></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
            {nextCategory ? <Link onClick={next}>Volgende</Link> : <Link onClick={done}>Einde, naar overzicht</Link>}
        </>
    );
}
