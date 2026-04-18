import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import HomePage from "./page/HomePage";
import UserPage from "./page/UserPage";
import CategoryPage from "./page/CategoryPage";
import type { User } from "./entity/user";
import { loadCards } from "./utils/cards";
import type { Category } from "./entity/category";
import SortPage from "./page/SortPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { Scores } from "./entity/score";
import { calculateScores, initScores, initInputs } from "./utils/scores";
import type { Inputs } from "./entity/input";
import { defaultUsers } from "./utils/users";
import type { Game } from "./entity/game";
import { defaultGame } from "./utils/game";
import { getCategories } from "./utils/categories";
import CssBaseline from "@mui/material/CssBaseline";
import ScorePage from "./page/ScorePage";
import GamePage from "./page/GamePage";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#63d219", // required
            light: "#7cda3e", // optional, auto-derived if omitted
            dark: "#479613", // optional
            contrastText: "#fff", // optional
        },
    },
});

const INPUTS = "inputs_v2";

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [game] = useState<Game>(defaultGame);
    const cards = useMemo(() => loadCards(game), [game]);
    const [users, setUsers] = useState<User[]>(defaultUsers);
    const [page, setPage] = useState("home");
    const [user, setUser] = useState<User>(users[0]);
    const [category, setCategory] = useState<Category | null>(null);
    const [inputs, setInputs] = useState<Inputs>(initInputs(users));
    const [scores, setScores] = useState<Scores>(initScores(users));
    const categories = useMemo(() => getCategories(game), [game]);

    useEffect(() => {
        if (loading) {
            const s = localStorage.getItem(INPUTS);
            if (s) {
                setInputs(JSON.parse(s));
            }
            setLoading(false);
        } else {
            const timer = setTimeout(() => {
                localStorage.setItem(INPUTS, JSON.stringify(inputs));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [inputs]);

    useEffect(() => {
        setScores(calculateScores(inputs, cards, game));
    }, [inputs]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <section id="center">
                    {page == "home" && <HomePage setPage={setPage}></HomePage>}
                    {page == "game" && (
                        <GamePage
                            users={users}
                            scores={scores}
                            setPage={setPage}
                            setUsers={setUsers}
                            inputs={inputs}
                            setInputs={setInputs}
                        ></GamePage>
                    )}
                    {page == "scores" && (
                        <ScorePage setPage={setPage} users={users} game={game} scores={scores}></ScorePage>
                    )}
                    {page == "user" && (
                        <UserPage
                            users={users}
                            scores={scores}
                            setPage={setPage}
                            setUser={setUser}
                            inputs={inputs}
                            setInputs={setInputs}
                        ></UserPage>
                    )}
                    {page == "category" && (
                        <CategoryPage
                            setPage={setPage}
                            categories={categories}
                            setCategory={setCategory}
                            user={user!}
                            cards={cards}
                            inputs={inputs}
                            scores={scores}
                        ></CategoryPage>
                    )}
                    {page == "sort" && (
                        <SortPage
                            setPage={setPage}
                            setCategory={setCategory}
                            users={users}
                            user={user!}
                            category={category!}
                            cards={cards}
                            inputs={inputs}
                            setInputs={setInputs}
                            scores={scores}
                            game={game}
                        ></SortPage>
                    )}
                </section>
            </ThemeProvider>
        </>
    );
}

export default App;
