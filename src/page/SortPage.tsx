import styles from "./SortPage.module.css";
import type { User } from "../entity/user";
import { type Category } from "../entity/category";
import { useMemo } from "react";
import type { Card } from "../entity/card";
import { getCategoryCards } from "../utils/cards";
import Amount from "./component/Amount";
import type { Scores } from "../entity/score";
import { getNextCategory } from "../utils/categories";
import type { Inputs } from "../entity/input";
import Chip from "@mui/material/Chip";
import React from "react";
import Grot from "./component/Grot";
import type { Game } from "../entity/game";
import { getScoreLabel } from "../utils/scores";
import ColorCardTable from "./component/ColorCardTable";
import SortColor from "./component/SortColor";
import { Button } from "@mui/material";

type Props = {
    setPage: (page: string) => void;
    setCategory: (category: Category) => void;
    users: User[];
    user: User;
    category: Category;
    cards: Card[];
    inputs: Inputs;
    scores: Scores;
    setInputs: (inputs: Inputs) => void;
    game: Game;
};

export default function SortPage({
    setPage,
    setCategory,
    user,
    scores,
    category,
    cards,
    inputs,
    setInputs,
    game,
}: Props) {
    const getCount = (card: Card) => {
        return inputs[user.id].cardCount[card.id] ?? 0;
    };

    const getSubCount = (card: Card) => {
        return inputs[user.id].cardSubCount[card.id] ?? 0;
    };

    const getSubCountMax = (card: Card) => {
        if (card.sub_question_max == "overnemen") {
            return inputs[user.id].cardCount[card.id];
        } else if (card.sub_question_max == "overnemen-paar") {
            return Math.floor(inputs[user.id].cardCount[card.id] / 2);
        } else {
            return undefined;
        }
    };

    const setCount = (card: Card, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.id] = { ...inputs[user.id] };
        newInputs[user.id].cardCount = { ...inputs[user.id].cardCount };
        newInputs[user.id].cardCount[card.id] = count;
        setInputs(newInputs);
    };

    const setSubCount = (card: Card, count: number) => {
        const newInputs: Inputs = { ...inputs };
        newInputs[user.id] = { ...inputs[user.id] };
        newInputs[user.id].cardSubCount = { ...inputs[user.id].cardSubCount };
        newInputs[user.id].cardSubCount[card.id] = count;
        setInputs(newInputs);
    };

    const nextCategory = getNextCategory(category);

    const next = () => {
        if (nextCategory) {
            setCategory(nextCategory);
            window.scrollTo(0, 0);
        }
    };

    const done = () => {
        setPage("user");
    };

    const categoryCards: Card[] = useMemo(() => getCategoryCards(cards, category), [category]);

    return (
        <>
            <div>
                <Button variant="outlined" onClick={() => setPage("user")}>
                    Start
                </Button>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <Button variant="outlined" onClick={() => setPage("category")}>
                    {user.name}
                </Button>
                &nbsp;&nbsp;/&nbsp;&nbsp;<span>{category.name}</span>
            </div>
            <div className={styles.cards}>
                {category.name == "Grot" ? (
                    <Grot user={user} inputs={inputs} setUserInput={setInputs} scores={scores} game={game} />
                ) : (
                    categoryCards.map((card) => (
                        <React.Fragment key={card.id}>
                            <div className={styles.card}>
                                <SortColor sort={card.sort[0]} />
                                <div className={styles.name}>{card.display_name}</div>
                                <Amount
                                    value={getCount(card)}
                                    setValue={(count) => setCount(card, count)}
                                    max={card.amount}
                                />
                                {inputs[user.id].cardCount[card.id] ? (
                                    <Chip
                                        className={styles.chip}
                                        label={getScoreLabel(scores[user.id].cardScores[card.id])}
                                        color="success"
                                    ></Chip>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            {card.name == "Wisent" && getCount(card) > 0 && (
                                <ColorCardTable
                                    inputs={inputs}
                                    user={user}
                                    setInputs={setInputs}
                                    colors={["darkgreen", "brown"]}
                                    card={card}
                                />
                            )}
                            {card.name == "Eland" && getCount(card) > 0 && (
                                <ColorCardTable
                                    inputs={inputs}
                                    user={user}
                                    setInputs={setInputs}
                                    colors={["lightblue", "lightgreen"]}
                                    card={card}
                                />
                            )}
                            {card.name == "Ree" && getCount(card) > 0 && (
                                <ColorCardTable
                                    inputs={inputs}
                                    user={user}
                                    setInputs={setInputs}
                                    colors={["darkblue", "yellow", "lightgreen", "darkgreen", "orange"]}
                                    card={card}
                                    maxChecks={getCount(card)}
                                />
                            )}
                            {card.name == "Gems" && getCount(card) > 0 && (
                                <ColorCardTable
                                    inputs={inputs}
                                    user={user}
                                    setInputs={setInputs}
                                    colors={["lightblue", "pink", "purple"]}
                                    card={card}
                                    maxChecks={getCount(card)}
                                />
                            )}
                            {card.sub_question && !!getCount(card) && (
                                <div className={styles.card}>
                                    <div></div>
                                    <div className={styles.sub_question}>{card.sub_question}</div>
                                    <Amount
                                        buttonColor="info"
                                        valueColor="secondary"
                                        value={getSubCount(card)}
                                        setValue={(count) => setSubCount(card, count)}
                                        max={getSubCountMax(card)}
                                    />
                                    <div></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
            {nextCategory ? (
                <Button variant="outlined" onClick={next}>
                    Volgende
                </Button>
            ) : (
                <Button variant="outlined" onClick={done}>
                    Einde, naar overzicht
                </Button>
            )}
        </>
    );
}
