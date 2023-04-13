import { Response } from "./types";
import openai from "openai";

export const API_KEY = "api_key";

export async function sendRequest(inputValue: string) {
  const apiKey = localStorage.getItem(API_KEY);
  const OPENAI_API_KEY = apiKey;
  const MODEL_3 = "gpt-3.5-turbo";
  const MODEL_4 = "gpt-4";
  console.log(OPENAI_API_KEY);
  const data = {
    model: MODEL_3,
    messages: [{ role: "user", content: inputValue }],
  };
  const response = await fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function handleResponse(response: Response) {
  return response.choices[0].message.content;
}

export function getRandomKey(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function findCodeInSentence(sentence: string): string | null {
  // Regular expression to match a code block
  const codeRegex = /```[\s\S]*?```/g;

  // Search for the first code block in the sentence
  const match = sentence.match(codeRegex);

  // If a code block was found, return it
  if (match && match.length > 0) {
    return match[0];
  }

  // Otherwise, return null
  return null;
}

export function findListInSentence(sentence: string): string | null {
  // Regular expression to match a code block
  const listRegex = /^(\n\n).*\.$/s;
  // const listRegex = /(?:\n\n|\n-)(?!```)(.*?)\.(?!\n\n|\n-)/gs;

  // Search for the first code block in the sentence
  const match = sentence.match(listRegex);

  // If a code block was found, return it
  if (match && match.length > 0) {
    return match[0];
  }

  // Otherwise, return null
  return null;
}
