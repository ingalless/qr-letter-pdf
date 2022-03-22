import { useEffect, useState } from "react";
import Layout from "../components/layout";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      return;
    }
    setData(JSON.parse(window.localStorage.getItem("data")));
  }, [data, setData]);

  const createLetter = () => {
    window.localStorage.setItem(
      "data",
      JSON.stringify({
        letters: [{ id: 1, name: "Untitled", fields: ["1", "2", "3"] }],
      })
    );
  };
  return (
    <Layout title="Letter Maker">
      <div className="text-left">
        <h2 className="text-xl text-blue-700 font-bold">
          Making letters simple
        </h2>
        {data ? (
          <p>Got something</p>
        ) : (
          <button
            onClick={createLetter}
            className="bg-blue-700 p-2 text-white rounded mt-4 w-full"
          >
            Create your first letter
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Home;
