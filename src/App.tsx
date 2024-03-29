import { useState, useRef, useEffect, useCallback } from "react";
import { State } from "./components/types";
import ChatResponse from "./components/ChatResponse/ChatResponse";
import ChatInput from "./components/ChatInput/ChatInput";
import { handleResponse, sendRequest } from "./components/utils";
import { SideBar } from "./components/SideBar/SideBar";

const ChatApp = () => {
  const [sidebarProp, setSidebarProp] = useState<string>("");
  const [userInput, setUserInput] = useState<State["userInput"]>("");
  const [chatbotResponse, setChatbotResponse] =
    useState<State["chatbotResponse"]>("");
  const [isResponseCopied, setIsResponseCopied] =
    useState<State["isResponseCopied"]>(false);
  const [userInputHeight, setUserInputHeight] =
    useState<State["userInputHeight"]>(0);
  const [chatbotResponseHeight, setChatbotResponseHeight] =
    useState<State["chatbotResponseHeight"]>(0);

  const userInputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const chatbotResponseTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    if (sidebarProp !== null) {
      setSidebarProp(value);
    } else {
      setUserInput(value);
    }
    setIsResponseCopied(false);
  }

  // create an async function called generateResponse
  const generateResponse = async () => {
    if (sidebarProp !== null) {
      setSidebarProp("");
    } else {
      setUserInput("");
    }
    try {
      // make a request using the userInput and wait for the response
      const response = await sendRequest(sidebarProp ? sidebarProp : userInput);
      // handle the response and wait for the message content
      const messageContent = await handleResponse(response);
      console.log(JSON.stringify(messageContent));
      // set the chatbot response to the message content
      setChatbotResponse(messageContent);
    } catch (error) {
      // if there's an error, log it and set the chatbot response to an error message
      console.log(error);
      setChatbotResponse("Oops! Something went wrong. Please try again.");
    }
  };

  const copy = useCallback(async () => {
    try {
      if (chatbotResponse) {
        navigator.clipboard.writeText(chatbotResponse);
        setIsResponseCopied(true);
      }
    } catch (error) {
      console.log(error);
      setIsResponseCopied(false);
    }
  }, [chatbotResponse]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const userInputTextarea = userInputTextareaRef.current;
    const chatbotResponseTextarea = chatbotResponseTextareaRef.current;

    if (userInputTextarea) {
      setUserInputHeight(userInputTextarea.scrollHeight);
    }

    if (chatbotResponseTextarea) {
      setChatbotResponseHeight(chatbotResponseTextarea.scrollHeight);
    }

    if (userInput === "" || sidebarProp === "") {
      setUserInputHeight(30);
    }
  }, [
    userInput,
    sidebarProp,
    userInputTextareaRef,
    chatbotResponseTextareaRef,
    chatbotResponse,
  ]);

  return (
    <div className="flex flex-row">
      <div
        className={`bg-[#141620] text-white h-screen ${
          screenWidth > 720 ? "w-1/6" : ""
        }`}
      >
        <SideBar setSidebarProp={setSidebarProp} screenWidth={screenWidth} />
      </div>

      <div className="flex flex-col h-screen">
        {chatbotResponse && (
          <ChatResponse
            chatbotResponse={chatbotResponse}
            chatbotResponseTextareaRef={chatbotResponseTextareaRef}
            chatbotResponseHeight={chatbotResponseHeight}
            isResponseCopied={isResponseCopied}
            copy={copy}
          />
        )}
        <ChatInput
          userInput={sidebarProp ? sidebarProp : ""}
          handleInputChange={handleInputChange}
          generateResponse={generateResponse}
          userInputTextareaRef={userInputTextareaRef}
          userInputHeight={userInputHeight}
          sidebarProp={sidebarProp}
        />
      </div>
    </div>
  );
};

export default ChatApp;
