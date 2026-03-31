import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useMemo, useState } from "react";
import "./App.css";
import Home from "./page/HomePage";
import Game from "./page/UserPage";
import CategoryPage from "./page/CategoryPage";
import type { User } from "./entity/user";
import { loadCards } from "./utils/cards";
import type { Category } from "./page/data/category";
import SortPage from "./page/SortPage";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    const [page, setPage] = useState("home");
    const [user, setUser] = useState<User | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const cards = useMemo(() => loadCards(), []);

    console.log(cards);

    return (
        <>
            <ThemeProvider theme={theme}>
                <section id="center">
                    {page == "home" && <Home setPage={setPage}></Home>}
                    {page == "game" && <Game setPage={setPage} setUser={setUser}></Game>}
                    {page == "main" && (
                        <CategoryPage setPage={setPage} setCategory={setCategory} user={user!}></CategoryPage>
                    )}
                    {page == "sort" && (
                        <SortPage
                            setPage={setPage}
                            setCategory={setCategory}
                            user={user!}
                            category={category!}
                            cards={cards}
                        ></SortPage>
                    )}
                </section>
            </ThemeProvider>
        </>
    );
}

export default App;
