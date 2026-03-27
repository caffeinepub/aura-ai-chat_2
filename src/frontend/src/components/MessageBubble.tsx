import { Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Message } from "../App";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div
        className="flex items-end justify-end gap-3 message-fade-in"
        data-ocid={`chat.item.${index + 1}`}
      >
        <div className="flex flex-col items-end gap-1 max-w-[70%]">
          <div
            className="px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed"
            style={{
              background: "linear-gradient(135deg, #4F6EF7, #6D5EF7)",
              color: "#fff",
            }}
          >
            {message.content}
          </div>
          <span className="text-xs" style={{ color: "#4B5563" }}>
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, #4F6EF7, #6D5EF7)",
            color: "#fff",
          }}
        >
          U
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-3 group message-fade-in"
      data-ocid={`chat.item.${index + 1}`}
    >
      <div
        className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: "#1A2233", border: "1px solid #223046" }}
      >
        <Sparkles className="w-4 h-4" style={{ color: "#4F6EF7" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="relative rounded-2xl rounded-tl-sm px-5 py-4 text-sm leading-relaxed"
          style={{
            background: "#131B2C",
            border: "1px solid #223046",
            color: message.isError ? "#F87171" : "#E5E7EB",
          }}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          {/* Copy button */}
          <button
            type="button"
            data-ocid={`chat.secondary_button.${index + 1}`}
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-white/10"
            style={{ color: "#9CA3AF" }}
            title="Copy"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        <span className="text-xs mt-1 block" style={{ color: "#4B5563" }}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
