import Button from "@mui/material/Button";
import "./Main.css";
import type { User } from "../entity/user";

type Props = { setPage: (page: string) => void; user: User };

export default function Main({ setPage, user }: Props) {
    return (
        <>
            <div className="users">{user.name}</div>
        </>
    );
}
