import Head from 'next/head';
import Image from 'next/image';
import TeamLogos from '../components/TeamLogos';
import styles from '../styles/Home.module.css';
import { google } from "googleapis";
import { parseCSV, analyseResults } from "soccer-predictor/lib/index.js";
import SelectTeams from '../components/SelectTeams';

function Home({ teams }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ligat HaAl Predictor</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Ligat HaAl Predictor</h1>
        <h2 className={styles.description}>Israeli premier league match results predictions</h2>
        <div className={styles.container}>
          <TeamLogos />
        </div>
        <h2 className={styles.description}> Select Teams</h2>
        <div>
          <SelectTeams teams={teams} />
        </div>
        <div className={`${styles.container} ${styles.grid} ${styles.card}`}>
          {/* <h2 className={styles.description}>Prediction for {home} vs. {away}</h2> */}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.grid} ${styles.description}`}>
          Developed by Evyatar Swissa
          <a
            href="https://github.com/swissclock"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <Image src="/github.png" alt="Github Logo" width={32} height={32} />
            </span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const { results } = query;
  const range = `Sheet1!A1:D447`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const data = response.data.values;
  const str = data.map(a => a.join(",")).join("\r\n");
  const resultData = parseCSV(str);
  const teams = analyseResults(resultData, getMatchDetails)
  // console.log(teams)
  function getMatchDetails(data) {
    return {
      homeTeamName: data.HomeTeam,
      awayTeamName: data.AwayTeam,
      homeGoals: data.HG,
      awayGoals: data.AG
    }
  }
  return {
    props: { teams }
  }
}

export default Home