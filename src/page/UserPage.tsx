import Button from "@mui/material/Button";
import styles from "./UserPage.module.css";
import type { User } from "../entity/user";
import React from "react";

type Props = { users: User[]; setPage: (page: string) => void; setUser: (user: User) => void };

export default function UserPage({ users, setUser, setPage }: Props) {
    const select = (user: User) => {
        setUser(user);
        setPage("category");
    };

    return (
        <>
            <div className={styles.users}>
                {users.map((user) => (
                    <React.Fragment key={user.name}>
                        <div>{user.name}</div>
                        <div>
                            <Button onClick={() => select(user)}>Bewerk &gt;</Button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
