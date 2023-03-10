import { RefObject } from "react";
import { IoMdCloudDone } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import CodeBlock from "../CodeBlock/CodeBlock";
import { ChatResponseProps } from "../types";
import { findCodeInSentence } from "../utils";

const ChatResponse = ({
  chatbotResponse,
  chatbotResponseTextareaRef,
  chatbotResponseHeight,
  isResponseCopied,
  copy,
}: ChatResponseProps) => {
  const COPY_ICON = <IoCopy size={15} />;
  const SUCCESS_ICON = <IoMdCloudDone size={25} />;
  const code = findCodeInSentence(chatbotResponse);

  return (
    <div className="flex justify-center items-center flex-col ml-20">
      <button
        onClick={copy}
        className="bg-[#10A37F] hover:bg-[#10C17F] rounded-lg px-4 py-2 focus:outline-none my-5"
      >
        {isResponseCopied ? SUCCESS_ICON : COPY_ICON}
      </button>
      <div
        ref={chatbotResponseTextareaRef as unknown as RefObject<HTMLDivElement>}
        className="bg-[#444654] rounded-lg w-full overflow-y-auto max-h-[450px] pl-5 pr-5 pt-1 font-semibold"
        contentEditable={false}
        style={{ height: `${chatbotResponseHeight}px` }}
      >
        {chatbotResponse}
        <CodeBlock code={code} />
      </div>
    </div>
  );
};

export default ChatResponse;
