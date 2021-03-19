import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Letter with QR Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Letter with QR Code PDF Generator
        </h1>

        <p className="mt-3 text-2xl">Get started by entering a URL below</p>

        <div className="flex items-center mt-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            name="url"
            id="url"
            className="block border border-blue-700 rounded rounded-r-none p-2 w-64"
          />
          <a
            className="block bg-blue-700 text-white p-2 border rounded rounded-l-none border-blue-700"
            target="_blank"
            href={`/api/pdf?url=${encodeURIComponent(url)}`}
          >
            Generate
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
