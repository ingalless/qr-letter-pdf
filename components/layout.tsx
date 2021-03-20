import Head from "next/head";
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

export default Layout;
