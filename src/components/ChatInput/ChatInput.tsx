import { RiSendPlaneFill } from "react-icons/ri";
import { ChatInputProps } from "../types";

const ChatInput = ({
  userInput,
  handleInputChange,
  generateResponse,
  userInputTextareaRef,
  userInputHeight,
}: ChatInputProps) => {
  const SEND_ICON = <RiSendPlaneFill />;

  return (
    <div className="bg-black w-3/4 rounded-lg absolute bottom-0 ml-20 mb-5 flex items-center">
      <textarea
        ref={userInputTextareaRef}
        className="bg-[#444654] rounded-lg overflow-y-auto w-full max-h-60 pt-1 py-1 font-semi
        
        bold"
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
