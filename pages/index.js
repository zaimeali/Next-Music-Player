import Head from "next/head";
import Player from "../components/Player";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Music Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Player />
    </div>
  );
}
