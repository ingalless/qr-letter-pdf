import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { LoremIpsum } from "lorem-ipsum";

import { Settings } from "../lib/types";
import Layout from "../components/layout";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const placeholderContent = `Dear sir/madam

${lorem.generateParagraphs(2).replace(/\n/g, "\n\n")}

Kind regards,
John Doe`;

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}
const Input = ({
  name,
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: InputProps) => {
  return (
    <label className="text-left w-full block font-semibold text-blue-900">
      {label}
      {required && "*"}
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        type="text"
        name={name}
        id={name}
        className="block border border-blue-700 rounded p-2 w-full"
        required={required}
      />
    </label>
  );
};

const TextArea = ({
  name,
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: InputProps) => {
  return (
    <label className="text-left w-full block font-semibold text-blue-900">
      {label}
      {required && "*"}
      <textarea
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        name={name}
        id={name}
        className="block border border-blue-700 rounded p-2 w-full"
        required={required}
        rows={20}
      />
    </label>
  );
};

export default function Home() {
  const [dataUrl, setDataUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const [content, setContent] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    street: "",
    state: "",
    city: "",
    postcode: "",
    email: "",
    font: "",
    save: false,
  });

  useEffect(() => {
    if (!link) {
      setDataUrl("");
      return;
    }
    QRCode.toDataURL(link).then(setDataUrl);
  }, [link, dataUrl, setDataUrl]);

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((json) => {
        setSettings(json as any);
      });
  }, []);
  const handleCheck = (checked: boolean) => {
    if (!checked) {
      updateSetting("save", false);
      setShowModal(false);
      return;
    }
    setShowModal(true);
  };
  const handleConfirm = () => {
    setShowModal(false);
    updateSetting("save", true);
  };
  const updateSetting = (name: string, value: string | boolean) => {
    setSettings({ ...settings, [name]: value });
  };
  return (
    <Layout>
      <p className="mt-3 text-xl">Get started by filling in the form below.</p>

      <form
        target="_blank"
        className="w-full my-3"
        action="/api/pdf"
        method="POST"
      >
        <Input
          onChange={(val) => setName(val)}
          value={name}
          label="Name"
          placeholder="Joe Bloggs"
          name="name"
        />
        <h2 className="text-blue-900 font-bold text-left mt-4">
          Address Details
        </h2>
        <div className="relative">
          <label className="text-left w-full flex items-center font-semibold text-blue-900">
            <input
              className="mr-2"
              type="checkbox"
              name="save"
              id="save"
              checked={settings.save}
              onChange={(e) => handleCheck(e.target.checked)}
            />
            Save address for next time
          </label>
          <Modal
            isOpen={showModal}
            onOk={handleConfirm}
            onCancel={() => handleCheck(false)}
          />
        </div>
        <Input
          onChange={(val) => updateSetting("street", val)}
          value={settings.street}
          label="Street"
          placeholder="123 Imaginary Lane"
          name="street"
        />
        <Input
          onChange={(val) => updateSetting("state", val)}
          value={settings.state}
          label="Area"
          placeholder="Imaginary Area"
          name="state"
        />
        <Input
          onChange={(val) => updateSetting("city", val)}
          value={settings.city}
          label="City"
          placeholder="City"
          name="city"
        />
        <Input
          onChange={(val) => updateSetting("postcode", val)}
          value={settings.postcode}
          label="Postcode"
          placeholder="AB1 2CD"
          name="postcode"
        />
        <Input
          onChange={(val) => updateSetting("email", val)}
          value={settings.email}
          label="Email"
          placeholder="mail@example.com"
          name="email"
        />
        <h2 className="text-blue-900 font-bold text-left mt-4">Extra Info</h2>
        <Input
          onChange={(val) => setExtra(val)}
          value={extra}
          label="Extra Line (Optional)"
          placeholder="E.g. '01234567890' or 'Sales Assistant'"
          name="extra"
        />
        <h2 className="text-blue-900 font-bold text-left mt-4">QR Code</h2>
        <Input
          value={link}
          onChange={setLink}
          label="QR Code URL"
          placeholder="https://google.com"
          name="url"
        />
        <div className="mx-auto">
          {dataUrl && (
            <img
              className="mx-auto h-32"
              src={dataUrl}
              alt={`QR Code for ${link}`}
            />
          )}
        </div>
        <div className="block">
          <button
            type="button"
            className="mt-2 mb-1 flex items-center text-sm"
            onClick={() => setAdvancedOpen(!advancedOpen)}
          >
            Advanced Settings <Toggle open={advancedOpen} />
          </button>
          <Transition
            show={advancedOpen}
            enter="transition-all duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all duration-100"
            leaveTo="opacity-0"
            leaveFrom="opacity-100"
          >
            <div className="rounded border border-gray-300 shadow p-4">
              <label className="text-left w-full block font-semibold text-blue-900">
                Font
                <select
                  onChange={(e) => updateSetting("font", e.target.value)}
                  value={settings.font}
                  defaultValue={settings.font}
                  className="block border border-blue-700 rounded p-2 w-full"
                  name="font"
                  id="font"
                >
                  <option value="Helvetica">Helvetica (Default)</option>
                  <option value="Courier">Courier</option>
                  <option value="Times-Roman">Times New Roman</option>
                </select>
              </label>

              <TextArea
                name="content"
                label="Content"
                value={content}
                onChange={setContent}
                placeholder={placeholderContent}
              />
              <p className="text-sm text-gray-600">
                Psst, use the drag handle on the bottom right to resize the
                above box!
              </p>
            </div>
          </Transition>
        </div>

        <button
          className="block w-full bg-blue-700 text-white mt-4 p-2 border rounded border-blue-700"
          type="submit"
        >
          Generate your PDF
        </button>
        <Link href="/writing-lines">
          <a className="block mt-2 w-full text-blue-600 font-semibold">
            Why not get some writing lines?
          </a>
        </Link>
      </form>
    </Layout>
  );
}

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onCancel, onOk }) => (
  <Transition
    className="absolute z-10"
    show={isOpen}
    enter="transition-all duration-300"
    enterFrom="opacity-0 -translate-y-10"
    enterTo="translate-y-10 opacity-100"
    leave="transition-all duration-100"
    leaveTo="opacity-0 -translate-y-10"
    leaveFrom="translate-y-0 opacity-100"
  >
    <div className="rounded w-96 max-w-full bg-white shadow-2xl mt-1 border border-gray-100 pb-2 z-20">
      <p className="block font-semibold border-b p-2 border-gray-200">
        Are you sure?
      </p>
      <div className="p-4">
        <p>
          Ticking this means that we will use cookies and similar methods to
          remember your preferences. We do not process this data any further
          than to allow your details to be prepopulated next time.
        </p>
      </div>
      <div className="space-x-2">
        <button
          type="button"
          className="border-gray-200 border p-1 px-2 rounded"
          onClick={onCancel}
        >
          No thanks.
        </button>
        <button
          type="button"
          onClick={onOk}
          className="bg-blue-700 p-1 px-2 text-white rounded"
        >
          That's fine!
        </button>
      </div>
    </div>
  </Transition>
);

const Toggle = ({ open = false }) =>
  !open ? (
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
