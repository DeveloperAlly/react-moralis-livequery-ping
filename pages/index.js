import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import "semantic-ui-css/semantic.min.css";
import Authentication from "./components/Authentication";
import FaucetFunds from "./components/FaucetFunds";

const Index = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Moralis Chain Ping</title>
        <meta name="description" content="Moralis LiveQuery Demo" />
        <link rel="icon" href="/Moralis-Icon-Dark.png" />
      </Head>
      <main className={styles.main}>
        <Layout>
          <Authentication />
          <Home>
            <FaucetFunds />
          </Home>
        </Layout>
      </main>
    </div>
  );
};

export default Index;
