import Button from "@mui/material/Button";
import frontImg from "@/assets/front.jpg";

type Props = { setPage: (page: string) => void };

export default function Home({ setPage }: Props) {
    return (
        <>
            <div className="hero">
                <img src={frontImg} className="base" height="179" alt="" />
            </div>
            <div>
                <h1>Score</h1>
                <p>Rekenhulp bij het berekenen van de score</p>
            </div>
            <Button variant="contained" onClick={() => setPage("user")}>
                Start
            </Button>
        </>
    );
}
