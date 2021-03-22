import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Settings } from "../lib/types";

enum STATES {
  IDLE,
  DESTROYING,
  SUCCESS,
}
const About = () => {
  const [state, setState] = useState<STATES>(STATES.IDLE);
  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((json) => {
        setSettings(json as any);
      });
  }, []);

  const deleteSession = async () => {
    setState(STATES.DESTROYING);
    await fetch("/api/destroy-session");
    setState(STATES.SUCCESS);
  };
  return (
    <Layout title="How it Works">
      <div className="block max-w-2xl space-y-4">
        <p>
          By filling in the form we are able to generate a PDF. Your data is
          sent straight to the PDF generation endpoint, and we use it only to
          generate the PDF.
        </p>
        <p>
          If you tick "Save address for next time" then we will store those in a
          secure session.{" "}
        </p>
        <p>
          Data stored in your secure session:
          <pre className="text-left block p-1 border border-gray-400 bg-gray-100 rounded">
            {JSON.stringify(settings, null, 4)}
          </pre>
        </p>
        <button
          onClick={deleteSession}
          className="bg-blue-700 rounded text-white p-2"
        >
          Delete your session
        </button>
        {state === STATES.SUCCESS && (
          <p className="relative rounded p-2 bg-green-50 border border-green-400 text-green-900 font-semibold">
            <button
              onClick={() => setState(STATES.IDLE)}
              className="absolute top-1 right-1"
            >
              <Close />
            </button>
            Session deleted!
          </p>
        )}
        <p>
          You can see an example of the PDF that is generated{" "}
          <a
            target="_blank"
            href="/example.pdf"
            className="text-blue-700 font-bold underline"
          >
            here.
          </a>
        </p>
      </div>
    </Layout>
  );
};

const Close = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default About;
