import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { State } from "./components/types";
import ChatResponse from "./components/ChatResponse/ChatResponse";
import ChatInput from "./components/ChatInput/ChatInput";
import { handleResponse, sendRequest } from "./components/utils";

const ChatApp = () => {
  const [userInput, setUserInput] = useState<State["userInput"]>("");
  const [chatbotResponse, setChatbotResponse] =
    useState<State["chatbotResponse"]>("");
  const [isResponseCopied, setIsResponseCopied] =
    useState<State["isResponseCopied"]>(false);
  const [userInputHeight, setUserInputHeight] =
    useState<State["userInputHeight"]>(50);
  const [chatbotResponseHeight, setChatbotResponseHeight] =
    useState<State["chatbotResponseHeight"]>(0);

  const userInputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const chatbotResponseTextareaRef = useRef<HTMLTextAreaElement>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(event.target.value);
    setIsResponseCopied(false);
  }

  // create an async function called generateResponse
  const generateResponse = async () => {
    try {
      // make a request using the userInput and wait for the response
      const response = await sendRequest(userInput);
      // handle the response and wait for the message content
      const messageContent = await handleResponse(response);
      // set the chatbot response to the message content
      setChatbotResponse(messageContent);
    } catch (error) {
      // if there's an error, log it and set the chatbot response to an error message
      console.log(error);
      setChatbotResponse("Oops! Something went wrong. Please try again.");
    } finally {
      // clear the userInput field
      setUserInput("");
    }
  };

  const copy = useCallback(async () => {
    try {
      if (chatbotResponseTextareaRef.current) {
        await navigator.clipboard.writeText(
          chatbotResponseTextareaRef.current.value
        );
        setIsResponseCopied(true);
      }
    } catch (error) {
      console.log(error);
      setIsResponseCopied(false);
    }
  }, []);

  useEffect(() => {
    const textarea = userInputTextareaRef.current;
    if (textarea) {
      setUserInputHeight(textarea.scrollHeight);
    }
  }, [userInput]);

  useEffect(() => {
    if (userInput === "") {
      setUserInputHeight(40);
    }
  }, [userInput]);

  useEffect(() => {
    const textarea = chatbotResponseTextareaRef.current;
    if (textarea) {
      setChatbotResponseHeight(textarea.scrollHeight);
    }
  }, [chatbotResponse]);

  return (
    <div>
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
        userInput={userInput}
        handleInputChange={handleInputChange}
        generateResponse={generateResponse}
        userInputTextareaRef={userInputTextareaRef}
        userInputHeight={userInputHeight}
      />
    </div>
  );
};

export default ChatApp;
