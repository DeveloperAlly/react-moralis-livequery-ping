import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralisCloudFunction } from "react-moralis";
import Layout from "./components/Layout";
import Home from "./components/Home";
import "semantic-ui-css/semantic.min.css";
import Authentication from "./components/Authentication";

const Index = (props) => {
  //will only run once on app loading
  useEffect(() => {
    fetch();
  }, []);

  // this is my init cloud function
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "InitFunction",
    { autoFetch: false }
  );

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
          <Home data={data} />
        </Layout>
      </main>
    </div>
  );
};

export default Index;
