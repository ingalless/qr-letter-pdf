import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
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

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("");
  const [settings, setSettings] = useState({
    name: "",
    street: "",
    state: "",
    city: "",
    postcode: "",
    email: "",
    save: false,
  });
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
        className="w-full md:w-96 lg:w-72 my-3"
        action="/api/pdf"
        method="POST"
      >
        <p className="text-right w-full">* indicates required</p>
        <h2 className="text-blue-900 font-bold text-left">Address Details</h2>
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
          <Transition
            className="absolute z-10"
            show={showModal}
            enter="transition-all duration-300"
            enterFrom="opacity-0 -translate-y-10"
            enterTo="translate-y-10 opacity-100"
            leave="transition-all duration-100"
            leaveTo="opacity-0 -translate-y-10"
            leaveFrom="translate-y-0 opacity-100"
          >
            <div className="rounded w-96 max-w-full bg-white shadow-lg mt-1 border border-gray-100 pb-2">
              <p className="block font-semibold border-b p-2 border-gray-200">
                Are you sure?
              </p>
              <div className="p-4">
                <p>
                  Ticking this means that we will use cookies and similar
                  methods to remember your preferences. We do not collect this
                  data any further than to allow your details to be prepopulated
                  next time.
                </p>
              </div>
              <div className="space-x-2">
                <button
                  type="button"
                  className="border-gray-200 border p-1 px-2 rounded"
                  onClick={() => handleCheck(false)}
                >
                  No thanks.
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="bg-blue-700 p-1 px-2 text-white rounded"
                >
                  That's fine!
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <Input
          onChange={(val) => updateSetting("name", val)}
          value={settings.name}
          label="Name"
          placeholder="Joe Bloggs"
          name="name"
        />
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
        <h2 className="text-blue-900 font-bold text-left mt-4">QR Code</h2>
        <Input
          value={link}
          onChange={setLink}
          label="QR Code URL"
          placeholder="https://google.com"
          name="url"
          required
        />
        <button
          className="block w-full bg-blue-700 text-white mt-4 p-2 border rounded border-blue-700"
          type="submit"
        >
          Generate your PDF
        </button>
      </form>
    </Layout>
  );
}
