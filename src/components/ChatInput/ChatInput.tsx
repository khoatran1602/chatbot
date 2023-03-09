import { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { ChatInputProps } from "../types";

const ChatInput = ({
  userInput,
  handleInputChange,
  generateResponse,
  userInputTextareaRef,
  sidebarProp,
}: ChatInputProps) => {
  const [userInputHeight, setUserInputHeight] = useState<number>(50);
  const SEND_ICON = <RiSendPlaneFill />;

  useEffect(() => {
    const textarea = userInputTextareaRef.current;
    if (textarea) {
      // set the height of the textarea based on its content
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      // set the minimum height to 50px
      if (textarea.scrollHeight < 50) {
        setUserInputHeight(50);
      } else {
        setUserInputHeight(textarea.scrollHeight);
      }
    }
  }, [userInput, sidebarProp, userInputTextareaRef]);

  return (
    <div className="bg-black w-3/4 rounded-lg absolute bottom-0 ml-20 mb-5 flex items-center outline-none">
      <textarea
        ref={userInputTextareaRef}
        className="bg-[#444654] rounded-lg overflow-y-auto w-full max-h-60 pt-1 py-1 pl-2 font-semibold"
        value={userInput}
        onChange={handleInputChange}
        style={{ height: `${userInputHeight}px` }}
      />
      <button
        onClick={generateResponse}
        className="bg-[#10A37F] hover:bg-[#10C17F] text-white font-bold py-2 px-4 rounded ml-3"
      >
        {SEND_ICON}
      </button>
    </div>
  );
};

export default ChatInput;
