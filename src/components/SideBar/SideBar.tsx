import { useEffect, useState } from "react";
import { API_KEY, getRandomKey } from "../utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { APIKey } from "../APIKey/APIKey";
import { ImportPrompt } from "../ImportPrompt/ImportPrompt";

export const SideBar = ({
  setSidebarProp,
}: {
  setSidebarProp: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);

  useEffect(() => {
    const storedPrompts = Object.entries(localStorage)
      .filter(([key]) => key !== API_KEY)
      .map(([_, value]) => value);
    setUsedPrompts(storedPrompts);
  }, [localStorage]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    localStorage.setItem(getRandomKey(1, 100).toString(), prompt);
    const storedPrompts = Object.values(localStorage);
    setUsedPrompts(storedPrompts);
    setOpen(false);
  };

  const deletePrompt = (key: string) => {
    localStorage.removeItem(key);
    const storedPrompts = Object.values(localStorage);
    setUsedPrompts(storedPrompts);
  };

  const handleSidebarClick = (value: string) => {
    setSidebarProp(value); // call setSidebarProp function with the new value
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <ImportPrompt />
        <APIKey />
      </div>
      <ul className="flex flex-col">
        {usedPrompts.map((prompt, index) => (
          <div className="flex flex-row">
            <button
              key={index}
              className="text-center mt-5 rounded hover:bg-[#14c498] p-2 w-60 truncate"
              onClick={() => handleSidebarClick(prompt)}
            >
              {prompt}
            </button>
            <button
              className="mt-5 mr-2"
              onClick={() => deletePrompt(localStorage.key(index)!)}
            >
              <AiTwotoneDelete className="hover:text-gray-600" />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};
