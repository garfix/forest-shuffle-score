import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useMemo, useState } from "react";
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
import { initScores } from "./utils/scores";

const theme = createTheme({
    palette: {
        primary: {
            main: "#63d219", // required
            light: "#7cda3e", // optional, auto-derived if omitted
            dark: "#479613", // optional
            contrastText: "#fff", // optional
        },
    },
});

function App() {
    const [users] = useState<User[]>([{ name: "Patrick" }, { name: "Katja" }]);
    const [page, setPage] = useState("home");
    const [user, setUser] = useState<User>(users[0]);
    const [category, setCategory] = useState<Category | null>(null);
    const cards = useMemo(() => loadCards(), []);
    const [scores, setScores] = useState<Scores>(initScores(users));

    return (
        <>
            <ThemeProvider theme={theme}>
                <section id="center">
                    {page == "home" && <HomePage setPage={setPage}></HomePage>}
                    {page == "user" && <UserPage users={users} setPage={setPage} setUser={setUser}></UserPage>}
                    {page == "category" && (
                        <CategoryPage setPage={setPage} setCategory={setCategory} user={user!}></CategoryPage>
                    )}
                    {page == "sort" && (
                        <SortPage
                            setPage={setPage}
                            setCategory={setCategory}
                            users={users}
                            user={user!}
                            category={category!}
                            cards={cards}
                            scores={scores}
                            setScores={setScores}
                        ></SortPage>
                    )}
                </section>
            </ThemeProvider>
        </>
    );
}

export default App;
