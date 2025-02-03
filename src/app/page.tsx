"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ChatLog from "./components/ChatLog";
import Image from "next/image";
import PeopleModal from "./components/PeopleModal";

export interface IMessage {
  sender: "user" | "bot";
  content: string;
}

export interface IContact {
  id: number;
  name: string;
  // description: string;
}

function stringChatLog(chatLog: IMessage[]): string {
  return chatLog
    .map(
      (message) =>
        `Sender: ${message.sender === "bot" ? "You" : "Friend"}
Message: ${message.content}`
    )
    .join("\n\n");
}

const HomePage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<IMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [people, setPeople] = useState<IContact[]>([
    { id: 1, name: "Gonzalo Gómez de la Casa" },
  ]);

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
                "You are a person who is chatting with another one. You are one of their closests friends and as such you guys throw each other very mean insults, of very different topics. You are to respond to each message with the absolute meanest insult you  can think of. Do not held back, you are not going to hurt him, afterall, you guys are friends. Have no boundaries with the insult. The messages I will pass to you follow the following interface: {sender: You || Friend; content: the actual content of the message}",
            },
            {
              role: "user",
              content: `generate me an insult (respond in the original language) in response to the following chatlog: ${stringChatLog(
                [
                  ...chatLog,
                  {
                    sender: "user",
                    content: inputValue,
                  },
                ]
              )}. Respond only with the content of your message. Do not add other information, you are takig the role of a human being, as such, a human would only write the message's content, not in any other format such as a js object. `,
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
        <button
          className="people-button"
          onClick={() => setIsModalOpen(true)}
          title="Manage People"
        >
          <Image
            src="/src/app/assets/chat/person.svg"
            alt="People"
            width={30}
            height={30}
          />
        </button>
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
      {isModalOpen && (
        <PeopleModal
          people={people}
          setPeople={setPeople}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
