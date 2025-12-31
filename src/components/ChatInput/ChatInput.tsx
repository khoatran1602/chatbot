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
    <div className="absolute bottom-6 left-0 right-0 mx-auto w-full max-w-4xl px-4 flex items-end gap-3 z-50">
      <div className="flex-1 relative shadow-2xl rounded-xl bg-[#343541]">
        <textarea
          ref={userInputTextareaRef}
          className="bg-transparent text-white rounded-xl overflow-hidden resize-none w-full border border-gray-600 focus:border-[#10a37f] transition-colors py-3 px-4 outline-none"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter a topic for debate..."
          style={{ 
            height: `${userInputHeight}px`,
            maxHeight: '200px',
            minHeight: '52px'
          }}
          rows={1}
        />
      </div>
      <button
        onClick={generateResponse}
        disabled={!userInput.trim()}
        className={`p-3 rounded-xl transition-all shadow-lg flex-none ${
          userInput.trim() 
            ? 'bg-[#10A37F] hover:bg-[#1a7f64] text-white cursor-pointer transform hover:scale-105' 
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        {SEND_ICON}
      </button>
    </div>
  );
};

export default ChatInput;
