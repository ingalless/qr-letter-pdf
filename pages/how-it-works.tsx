import Layout from "../components/layout";

const About = () => (
  <Layout title="How it Works">
    <div className="block max-w-2xl space-y-4">
      <p>
        By filling in the form we are able to generate a PDF. Your data is sent
        straight to the PDF generation endpoint, and we use it only to generate
        the PDF.
      </p>
      <p>
        You can see an example of the PDF that is generated{" "}
        <a
          target="_blank"
          href="/example.pdf"
          className="text-blue-700 font-bold"
        >
          here.
        </a>
      </p>
    </div>
  </Layout>
);

export default About;
