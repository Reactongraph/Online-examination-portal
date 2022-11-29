import Head from "next/head";
import Image from "next/image";
// import styles from '../styles/Home.module.css'
import Login from "./login/index";
import 'regenerator-runtime/runtime'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </>
  );
}
