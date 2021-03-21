import Layout from "../components/layout";

const WritingLines = () => {
  return (
    <Layout title="Writing Lines Generator">
      <div className="space-y-2">
        <p>
          The default values will generate a set of writing lines that will be
          good for most. Just hit "Generate your PDF" and print!
        </p>
        <form
          target="_blank"
          action="/api/writing-lines"
          method="get"
          className="flex flex-col mx-auto items-center w-96 max-w-full"
        >
          <label
            className="text-left block font-semibold text-blue-900"
            htmlFor="number"
          >
            Line height
            <input
              className="text-center block border border-blue-700 rounded p-2"
              type="number"
              name="height"
              id="height"
              defaultValue="26"
              onFocus={(e) => e.target.select()}
            />
          </label>
          <button className="bg-blue-700 p-1 px-2 text-white rounded mt-4 w-full">
            Generate your PDF
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default WritingLines;
