import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import "flowbite";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jean Morillo Web</title>
        <meta
          name="description"
          content="Personal Website with experience and contact information for Jean Morillo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Jean's personal site | Experience and more"
        />
        <meta
          property="og:description"
          content="Personal Website with experience and contact information for Jean Morillo"
        />
        <meta property="og:url" content="https://webjems.com" />
        <meta
          property="og:image"
          content="https://webjems.com/profile-site.png"
        />
        <meta
          property="twitter:image"
          content="https://webjems.com/profile-site.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
