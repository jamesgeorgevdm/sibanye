'use client'

// Simple button used on the Hero to open the chatbot panel.
// Rather than passing props or a callback down through the tree, it fires a
// custom window event that ChatbotWidget listens for — keeps the two decoupled.

import { FiMessageCircle } from "react-icons/fi";

export default function OpenChatButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
      className="inline-flex items-center gap-2 bg-sky-700 text-white font-semibold px-8 py-3 rounded-sm hover:bg-sky-900 transition duration-200 shadow-sm"
    >
      <FiMessageCircle className="text-[1.1rem]" />
      Chat with our agent
    </button>
  );
}
