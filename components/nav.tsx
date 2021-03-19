import { useRouter } from "next/router";
import Link from "next/link";
const Nav: React.FC = () => {
  const router = useRouter();
  const isActive = (href: string) => router.pathname === href;
  return (
    <nav className="w-full px-16 mx-auto">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/">
            <a className={`${isActive("/") ? "text-blue-800 font-bold" : ""}`}>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/how-it-works">
            <a
              className={`${
                isActive("/how-it-works") ? "text-blue-800 font-bold" : ""
              }`}
            >
              How it Works
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
