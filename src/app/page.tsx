"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ChatLog from "./components/ChatLog";

export interface IMessage {
  sender: "user" | "bot";
  content: string;
}

const HomePage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<IMessage[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  function addMessage(sender: "user" | "bot", content: string) {
    const message = { sender, content };
    setChatLog((prev) => [...prev, message]);
  }

  async function sendMessage() {
    if (!inputValue.trim() || loadingResponse) return;

    setLoadingResponse(true);
    const _message = inputValue;
    addMessage("user", _message);
    setInputValue("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a very mean person, who likes to throw a lot of very creative insults. You also respond to the message they send you in their original language",
            },
            {
              role: "user",
              content: `generate me an insult in response to the following message: ${_message}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      addMessage("bot", data.response);
    } catch (error) {
      console.error("Fetch error:", error);
      addMessage(
        "bot",
        "Sorry, I couldn't process your request. Please try again."
      );
    } finally {
      setLoadingResponse(false);
    }
  }

  return (
    <div className="homepage-container">
      <h1 className="title">Chat Assistant</h1>

      <ChatLog log={chatLog} />

      <div className="input-container">
        <TextareaAutosize
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Talk to me"
          className="text-area"
          disabled={loadingResponse}
        />
        <button
          onClick={sendMessage}
          disabled={loadingResponse}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default HomePage;
