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
    <footer className="flex text-center items-center justify-center w-full h-24 border-t text-xs font-semibold tracking-tight text-gray-700">
      {title}
    </footer>
  </div>
);

export default Layout;
