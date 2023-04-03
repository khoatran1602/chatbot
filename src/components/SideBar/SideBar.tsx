import { useEffect, useState } from "react";
import { API_KEY, getRandomKey } from "../utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { APIKey } from "../APIKey/APIKey";
import { ImportPrompt } from "../ImportPrompt/ImportPrompt";

export const SideBar = ({
  setSidebarProp,
  screenWidth,
}: {
  setSidebarProp: (value: string) => void;
  screenWidth: number;
}) => {
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);
  const apiKey = localStorage.getItem(API_KEY) || "";

  useEffect(() => {
    const storedPrompts = Object.entries(localStorage)
      .filter(([key]) => key !== API_KEY)
      .map(([_, value]) => value);
    setUsedPrompts(storedPrompts);
  }, [localStorage]);

  const deletePrompt = (prompt: string) => {
    const entries = Object.entries(localStorage);
    for (const [key, val] of entries) {
      if (val === prompt) {
        localStorage.removeItem(key);
      }
    }
    const storedPrompts = Object.values(localStorage).filter(
      (value) => value !== apiKey
    );
    setUsedPrompts(storedPrompts);
  };

  const handleSidebarClick = (value: string) => {
    setSidebarProp(value); // call setSidebarProp function with the new value
  };

  const handleAddPrompt = (prompt: string) => {
    localStorage.setItem(getRandomKey(1, 100).toString(), prompt);
    const storedPrompts = Object.values(localStorage);
    setUsedPrompts(storedPrompts);
    setSidebarProp(prompt);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <ImportPrompt handleAddPrompt={handleAddPrompt} />
        <APIKey />
      </div>
      <ul className="flex flex-col">
        {usedPrompts
          .filter((prompt) => prompt !== apiKey)
          .map((prompt, index) => (
            <div className="flex flex-row" key={index}>
              <button
                className={`text-center mt-5 rounded hover:bg-[#14c498] p-2 truncate ${
                  screenWidth > 480 ? "w-48" : "w-20"
                }`}
                onClick={() => handleSidebarClick(prompt)}
              >
                {prompt}
              </button>
              <button
                className="mt-5 mr-2"
                onClick={() => {
                  deletePrompt(prompt);
                }}
              >
                <AiTwotoneDelete className="hover:text-gray-600" />
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
};
