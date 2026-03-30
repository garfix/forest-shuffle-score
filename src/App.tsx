import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useState } from "react";
import "./App.css";
import Home from "./page/Home";
import Game from "./page/Game";
import Main from "./page/Main";
import type { User } from "./entity/user";

function App() {
    const [page, setPage] = useState("home");
    const [user, setUser] = useState<User | null>(null);

    return (
        <>
            <section id="center">
                {page == "home" && <Home setPage={setPage}></Home>}
                {page == "game" && <Game setPage={setPage} setUser={setUser}></Game>}
                {page == "main" && <Main setPage={setPage} user={user!}></Main>}
            </section>
        </>
    );
}

export default App;
