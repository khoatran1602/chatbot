import { MutableRefObject } from "react";

export type State = {
  userInput: string;
  chatbotResponse: string;
  isResponseCopied: boolean;
  userInputHeight: number;
  chatbotResponseHeight: number;
};

export interface ChatResponseProps {
  chatbotResponse: string;
  chatbotResponseTextareaRef: React.RefObject<HTMLTextAreaElement>;
  chatbotResponseHeight: number;
  isResponseCopied: boolean;
  copy: () => void;
}

export interface ChatInputProps {
  userInput: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  generateResponse: () => void;
  userInputTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  userInputHeight: number;
  sidebarProp?: string;
}

export interface CodeBlockProps {
  code?: string | null;
}

export interface ListBlockProps {
  list?: string | null;
}

export interface SidebarProps {
  setSidebarProp: (value: string) => void;
  screenWidth: number;
}

export interface Response {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
}

export interface Choice {
  index: number;
  finish_reason: string;
  message: Message;
}

export interface Message {
  role: string;
  content: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
