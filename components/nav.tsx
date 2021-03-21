import { useRouter } from "next/router";
import Link from "next/link";
const links: { href: string; text: string }[] = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/writing-lines",
    text: "Writing Lines",
  },
  {
    href: "/how-it-works",
    text: "How it Works",
  },
];
const Nav: React.FC = () => {
  const router = useRouter();
  const isActive = (href: string) => router.pathname === href;
  return (
    <nav className="w-full px-16 mx-auto">
      <ul className="flex justify-center space-x-4">
        {links.map(({ href, text }) => (
          <li>
            <Link href={href}>
              <a
                className={`${isActive(href) ? "text-blue-800 font-bold" : ""}`}
              >
                {text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
