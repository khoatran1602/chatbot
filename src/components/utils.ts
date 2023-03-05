import { Response } from "./types";

export async function sendRequest(inputValue: string) {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: inputValue }],
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
