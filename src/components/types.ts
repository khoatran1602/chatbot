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
  copy: () => Promise<void>;
}

export interface ChatInputProps {
  userInput: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  generateResponse: () => void;
  userInputTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  userInputHeight: number;
}
