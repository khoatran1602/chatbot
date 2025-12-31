import { useState, useRef, useEffect, useCallback } from "react";
import { State } from "./components/types";
import { DebateResponse } from "./components/types/debate";
import ChatResponse from "./components/ChatResponse/ChatResponse";
import ChatInput from "./components/ChatInput/ChatInput";
import DebateView from "./components/DebateView/DebateView";
import { executeDebate } from "./components/api/debateApi";
import { SideBar } from "./components/SideBar/SideBar";

type ChatMode = 'simple' | 'debate';

const ChatApp = () => {
  // Mode selection
  const [chatMode, setChatMode] = useState<ChatMode>('debate');
  
  // Common state
  const [sidebarProp, setSidebarProp] = useState<string>("");
  const [userInput, setUserInput] = useState<State["userInput"]>("");
  
  // Simple chat state (legacy)
  const [chatbotResponse, setChatbotResponse] =
    useState<State["chatbotResponse"]>("");
  const [isResponseCopied, setIsResponseCopied] =
    useState<State["isResponseCopied"]>(false);
  const [userInputHeight, setUserInputHeight] =
    useState<State["userInputHeight"]>(0);
  const [chatbotResponseHeight, setChatbotResponseHeight] =
    useState<State["chatbotResponseHeight"]>(0);

  // Debate state
  const [debateResponse, setDebateResponse] = useState<DebateResponse | null>(null);
  const [isDebateLoading, setIsDebateLoading] = useState(false);
  const [debateError, setDebateError] = useState<string | null>(null);

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

  // Main response generation - now uses debate API
  const generateResponse = async () => {
    const question = sidebarProp ? sidebarProp : userInput;
    
    if (!question.trim()) {
      return;
    }

    // Clear input
    if (sidebarProp !== null) {
      setSidebarProp("");
    } else {
      setUserInput("");
    }

    if (chatMode === 'debate') {
      // Multi-agent debate mode
      setIsDebateLoading(true);
      setDebateError(null);
      setDebateResponse(null);
      
      try {
        const response = await executeDebate({
          question: question,
          context: undefined, // Could add context input later
        });
        setDebateResponse(response);
      } catch (error) {
        console.error('Debate error:', error);
        setDebateError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsDebateLoading(false);
      }
    } else {
      // Legacy simple chat mode (kept for backward compatibility)
      // Note: This still uses client-side API calls (not recommended)
      try {
        setChatbotResponse("Simple chat mode is deprecated. Please use Debate mode for secure API access.");
      } catch (error) {
        console.error(error);
        setChatbotResponse("Oops! Something went wrong. Please try again.");
      }
    }
  };

  const copy = useCallback(async () => {
    try {
      const textToCopy = chatMode === 'debate' && debateResponse?.judgeSynthesis
        ? debateResponse.judgeSynthesis.finalAnswer
        : chatbotResponse;
        
      if (textToCopy) {
        await navigator.clipboard.writeText(textToCopy);
        setIsResponseCopied(true);
      }
    } catch (error) {
      console.error(error);
      setIsResponseCopied(false);
    }
  }, [chatbotResponse, debateResponse, chatMode]);

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

      <div className="flex flex-col h-screen w-full bg-[#1a1b26] overflow-auto">
        {/* Mode Toggle */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-700">
          <span className="text-white text-sm font-medium">Mode:</span>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chatMode === 'debate'
                ? 'bg-[#10A37F] text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setChatMode('debate')}
          >
            🤖 Multi-Agent Debate
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chatMode === 'simple'
                ? 'bg-[#10A37F] text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setChatMode('simple')}
          >
            💬 Simple Chat (Legacy)
          </button>
          
          {chatMode === 'debate' && (
            <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
              🔒 Secure - API keys server-side
            </span>
          )}
        </div>

        {/* Response Area */}
        <div className="flex-1 overflow-auto p-4">
          {chatMode === 'debate' ? (
            <DebateView
              debate={debateResponse}
              isLoading={isDebateLoading}
              error={debateError}
            />
          ) : (
            chatbotResponse && (
              <ChatResponse
                chatbotResponse={chatbotResponse}
                chatbotResponseTextareaRef={chatbotResponseTextareaRef}
                chatbotResponseHeight={chatbotResponseHeight}
                isResponseCopied={isResponseCopied}
                copy={copy}
              />
            )
          )}
        </div>

        {/* Input Area */}
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
