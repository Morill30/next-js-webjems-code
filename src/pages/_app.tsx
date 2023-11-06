import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Script from "next/script";
import { useEffect } from "react";
import * as ga from "@/utils/googleAnalytics/ga";
import { SessionProvider } from "next-auth/react";
import "flowbite";
import { UserProvider } from "@/contexts/userContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ga.pageview(window.location.href);
  });
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-T55DNTQ7Z6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-T55DNTQ7Z6', {
              page_path: window.location.pathname,
          });
        `}
      </Script>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </SessionProvider>
    </>
  );
}
