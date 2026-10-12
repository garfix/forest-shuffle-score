import Button from "@mui/material/Button";
import frontImg from "@/assets/front.jpg";
import styles from "./HomePage.module.css";
import githubIcon from "../assets/github.svg?raw";

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
            <div className={styles.bottomRight}>
                <a href="https://github.com/garfix/forest-shuffle-score" target="_blank">
                    <span dangerouslySetInnerHTML={{ __html: githubIcon }} />
                    <br />
                    Github repository
                </a>
            </div>
        </>
    );
}
