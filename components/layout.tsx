import Head from "next/head";
import Image from "next/image";
import Nav from "./nav";

interface LayoutProps {
  title?: string;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Generate a Letter Template with QR Code",
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>{title}</title>
    </Head>
    <div className="my-4">
      <Nav />
    </div>
    <main className="flex flex-col items-center justify-center flex-1 px-8 md:px-20 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </main>
    <footer className="flex flex-col text-center items-center justify-evenly w-full h-24 border-t text-xs font-semibold tracking-tight text-gray-700">
      <span className="block">{title}</span>
      <pre className="block bg-gray-50 border border-gray-400 rounded-sm font-mono font-small px-1">
        &lt;/&gt; by{" "}
        <a className="text-blue-700 underline" href="https://ingalless.com">
          Jonny
        </a>
      </pre>
      <a href="https://github.com/ingalless/qr-letter-pdf" className="block">
        <Image src="/github.png" width={24} height={24} />
      </a>
    </footer>
  </div>
);

export default Layout;
