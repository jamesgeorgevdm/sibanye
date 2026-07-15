'use client'

// Floating chat widget — a circular FAB in the bottom-right corner that opens a chat panel.
// Talks to /api/chat which uses Google Gemini 2.5 Flash via the Vercel AI SDK.
// Listens for a custom "open-chatbot" window event so the hero's "Chat with our agent"
// button can open it without the two components being directly wired together.
//
// Rate-limit errors from the API are shown as a friendly message rather than a crash —
// see RATE_LIMIT_MESSAGE below if you want to change the wording.
//
// To give the chatbot school-specific context (opening hours, programmes, fees, etc.),
// fill in the SYSTEM_PROMPT string in app/api/chat/route.ts.

import { useMemo, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import type { UIMessage } from "ai";

const getMessageText = (message: UIMessage) =>
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("");

const RATE_LIMIT_MESSAGE =
  "It looks like either we are hitting a server error, or we've covered a lot of ground here! To make sure your specific needs get individual attention, please use our Contact page to send us a message directly.";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handler);
    return () => window.removeEventListener("open-chatbot", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-[Fredoka,sans-serif]">
      {isOpen && (
        <div
          className="absolute bottom-[72px] right-0 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] bg-[#1a3a5c] border border-[rgba(94,186,130,0.35)] rounded-2xl flex flex-col overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_24px_rgba(94,186,130,0.15)] animate-[chatbot-slide-up_0.25s_ease]"
          role="dialog"
          aria-label="Chat assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-[14px] bg-[#122a44] border-b border-[rgba(94,186,130,0.25)]">
            <h3 className="m-0 text-[1.1rem] text-[#5eba82] font-semibold tracking-wide">
              Sibanye Centre
            </h3>
            <button
              type="button"
              className="bg-transparent border-none text-white cursor-pointer text-[1.25rem] p-1 leading-none opacity-70 transition-[opacity,color] duration-200 hover:opacity-100 hover:text-[#5eba82]"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#1a3a5c]">
            {messages.length === 0 && (
              <p className="text-[rgba(255,255,255,0.55)] text-center m-auto text-[0.95rem] leading-[1.5]">
                Hi! Ask me about Sibanye Centre, our programmes, or how to get involved.
              </p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] px-[14px] py-[10px] rounded-xl text-[0.95rem] leading-[1.5] break-words [&_p]:m-0 [&_p]:mb-[6px] [&_p:last-child]:mb-0 [&_ul]:mt-1 [&_ul]:mb-[6px] [&_ul]:pl-[18px] [&_ol]:mt-1 [&_ol]:mb-[6px] [&_ol]:pl-[18px] [&_li]:mb-[2px] [&_strong]:font-bold [&_em]:italic
                  ${
                    message.role === "user"
                      ? "self-end bg-[#5eba82] text-[#122a44] rounded-br-[4px]"
                      : "self-start bg-[#122a44] text-white border border-[rgba(94,186,130,0.2)] rounded-bl-[4px]"
                  }`}
              >
                <ReactMarkdown>{getMessageText(message)}</ReactMarkdown>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="self-start px-[14px] py-[10px] bg-[#122a44] border border-[rgba(94,186,130,0.2)] rounded-xl text-[rgba(255,255,255,0.55)] text-[0.9rem] italic">
                Thinking...
              </div>
            )}
          </div>

          {error && (
            <p className="mx-4 px-3 py-2 bg-[rgba(180,40,40,0.2)] border border-[rgba(220,80,80,0.4)] rounded-lg text-[#f5a5a5] text-[0.85rem]">
              {RATE_LIMIT_MESSAGE}
            </p>
          )}

          {/* Input area */}
          <form
            className="flex gap-2 px-4 py-3 border-t border-[rgba(94,186,130,0.25)] bg-[#122a44]"
            onSubmit={handleSubmit}
          >
            <input
              className="flex-1 px-[14px] py-[10px] rounded-lg border border-[rgba(94,186,130,0.3)] bg-[#1a3a5c] text-white font-[Fredoka,sans-serif] text-[0.95rem] outline-none transition-[border-color] duration-200 focus:border-[#5eba82] placeholder:text-[rgba(255,255,255,0.4)]"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-[42px] h-[42px] rounded-lg border-none bg-[#5eba82] text-[#122a44] cursor-pointer flex items-center justify-center text-[1.1rem] transition-[background,opacity] duration-200 hover:bg-[#7dcf9a] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        className="w-14 h-14 rounded-full border-2 border-[#5eba82] bg-[#1a3a5c] text-[#5eba82] cursor-pointer flex items-center justify-center text-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_16px_rgba(94,186,130,0.25)] transition-[transform,box-shadow,background] duration-200 hover:scale-[1.05] hover:bg-[#122a44] hover:shadow-[0_6px_24px_rgba(0,0,0,0.4),0_0_20px_rgba(94,186,130,0.35)]"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
}
