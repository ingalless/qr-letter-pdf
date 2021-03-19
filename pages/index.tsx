import Head from "next/head";
import { useState } from "react";

const defaultLetterhead = `Joe Bloggs,
123 Imaginary Lane,
Imaginary Area,
Imagination City,
AB1 2CD

mail@example.com`;

interface InputProps {
  name: string;
  placeholder: string;
  required?: boolean;
}
const Input = ({ name, placeholder, required = false }: InputProps) => (
  <input
    placeholder={placeholder}
    type="text"
    name={name}
    id={name}
    className="block border border-blue-700 rounded p-2 w-full"
    required={required}
  />
);

export default function Home() {
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

        <p className="mt-3 text-2xl">
          Get started by entering your details and QR Code URL below
        </p>

        <form
          target="_blank"
          className="w-72 space-y-2 mt-3"
          action="/api/pdf"
          method="POST"
        >
          <Input placeholder="Joe Bloggs" name="name" />
          <Input placeholder="123 Imaginary Lane" name="street" />
          <Input placeholder="Imaginary Area" name="area" />
          <Input placeholder="City" name="city" />
          <Input placeholder="AB1 2CD" name="postcode" />
          <Input placeholder="mail@example.com" name="email" />
          <Input placeholder="https://google.com" name="url" required />
          <p className="my-1">We do not store your data!</p>
          <p className="my-1">
            However, you can generate only a QR Code by filling in only the URL
          </p>
          <button
            className="block w-full bg-blue-700 text-white p-2 border rounded border-blue-700"
            type="submit"
          >
            Generate
          </button>
        </form>
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
