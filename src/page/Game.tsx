import Button from "@mui/material/Button";
import "./Game.css";
import type { User } from "../entity/user";
import React from "react";

type Props = { setPage: (page: string) => void; setUser: (user: User) => void };

export default function Game({ setUser, setPage }: Props) {
    const users = [{ name: "Patrick" }, { name: "Katja" }];

    const select = (user: User) => {
        setUser(user);
        setPage("main");
    };

    return (
        <>
            <div className="users">
                {users.map((user) => (
                    <React.Fragment key={user.name}>
                        <div>{user.name}</div>
                        <div>{user.name}</div>
                        <Button onClick={() => select(user)}>Select</Button>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
