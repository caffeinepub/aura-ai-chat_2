import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Conversation } from "../App";
import Composer from "./Composer";
import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatAreaProps {
  conversation: Conversation | null;
  onSend: (content: string) => void;
  onNewChat: () => string;
  onSendFromEmpty: (content: string) => void;
}

export default function ChatArea({
  conversation,
  onSend,
  onSendFromEmpty,
}: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgCount = conversation?.messages.length ?? 0;
  const isLoading =
    conversation?.messages.some((m) => m.content === "__typing__") ?? false;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message count change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgCount]);

  const hasMessages = msgCount > 0;

  return (
    <div className="flex flex-col h-full" style={{ background: "#0E1525" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4 shrink-0 border-b"
        style={{ borderColor: "#223046", background: "rgba(14,21,37,0.9)" }}
      >
        <div>
          <h1 className="text-base font-semibold" style={{ color: "#E5E7EB" }}>
            {conversation?.title ?? "Aura AI"}
          </h1>
          {conversation && (
            <p className="text-xs" style={{ color: "#6B7280" }}>
              {conversation.messages.filter((m) => m.role === "user").length}{" "}
              messages
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="header.button"
            className="p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#6B7280" }}
          >
            <Settings className="w-4 h-4" />
          </button>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "#1A2233", border: "1px solid #223046" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #6D5EF7)",
                color: "#fff",
              }}
            >
              U
            </div>
            <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
              User
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-6 py-6 space-y-4 max-w-3xl mx-auto w-full">
          {!hasMessages ? (
            <EmptyState onSuggest={onSendFromEmpty} />
          ) : (
            conversation?.messages.map((msg, i) =>
              msg.content === "__typing__" ? (
                <TypingIndicator key={msg.id} index={i} />
              ) : (
                <MessageBubble key={msg.id} message={msg} index={i} />
              ),
            )
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Composer */}
      <div
        className="shrink-0 px-6 py-4 border-t"
        style={{ borderColor: "#223046", background: "rgba(14,21,37,0.95)" }}
      >
        <div className="max-w-3xl mx-auto">
          <Composer
            onSend={hasMessages ? onSend : onSendFromEmpty}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
