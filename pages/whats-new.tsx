import Layout from "../components/layout";

interface ReleaseProps {
  date: string;
  text?: string;
  changelog: string[];
}
const Release: React.VFC<ReleaseProps> = ({ date, text, changelog }) => (
  <div className="border-l-4 px-2 border-blue-500">
    <h2 className="text-lg font-bold text-blue-900 mb-2">{date}</h2>
    <ul className="text-gray-900 leading-snug tracking-tight">
      {changelog.map((c) => (
        <li>{c}</li>
      ))}
    </ul>
  </div>
);

const WhatsNew = () => {
  return (
    <Layout title="What's New?">
      <div className="block max-w-2xl space-y-8 text-left mt-2">
        <Release
          date="21st March 2022"
          changelog={[
            "Choose between 3 fonts from the 'Advanced Settings' box",
            "Add content to the PDF from the 'Advanced Settings' box",
          ]}
        />
        <Release
          date="8th February 2022"
          changelog={["Preview the QR code that will be generated"]}
        />
        <Release date="28th March 2021" changelog={["Release day! 🥳"]} />
      </div>
    </Layout>
  );
};

export default WhatsNew;
