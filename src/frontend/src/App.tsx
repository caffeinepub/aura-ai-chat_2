import { Toaster } from "@/components/ui/sonner";
import { useCallback, useRef, useState } from "react";
import type { backendInterface } from "./backend";
import ChatArea from "./components/ChatArea";
import Sidebar from "./components/Sidebar";
import { createActorWithConfig } from "./config";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const backendRef = useRef<backendInterface | null>(null);

  const getBackend = useCallback(async (): Promise<backendInterface> => {
    if (!backendRef.current) {
      backendRef.current = await createActorWithConfig();
    }
    return backendRef.current;
  }, []);

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null;

  const createNewChat = useCallback(() => {
    const id = generateId();
    const conv: Conversation = {
      id,
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(id);
    return id;
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) {
        setActiveId(null);
      }
    },
    [activeId],
  );

  const addMessage = useCallback((convId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        const updated = { ...c, messages: [...c.messages, message] };
        if (c.title === "New conversation" && message.role === "user") {
          updated.title =
            message.content.slice(0, 48) +
            (message.content.length > 48 ? "\u2026" : "");
        }
        return updated;
      }),
    );
  }, []);

  const handleSendMessage = useCallback(
    async (content: string, convId?: string) => {
      let targetId = convId ?? activeId;
      if (!targetId) {
        targetId = generateId();
        const conv: Conversation = {
          id: targetId,
          title: "New conversation",
          messages: [],
          createdAt: new Date(),
        };
        setConversations((prev) => [conv, ...prev]);
        setActiveId(targetId);
      }

      const finalTargetId = targetId;

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      addMessage(finalTargetId, userMsg);

      const typingId = generateId();
      const typingMsg: Message = {
        id: typingId,
        role: "assistant",
        content: "__typing__",
        timestamp: new Date(),
      };
      addMessage(finalTargetId, typingMsg);

      try {
        const actor = await getBackend();
        // Build history snapshot before the user message
        const history =
          conversations
            .find((c) => c.id === finalTargetId)
            ?.messages.map((m) => ({ role: m.role, content: m.content })) ?? [];

        const response = await actor.chat(content, JSON.stringify(history));
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== finalTargetId) return c;
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === typingId ? { ...m, content: response } : m,
              ),
            };
          }),
        );
      } catch (err) {
        const errText =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== finalTargetId) return c;
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === typingId
                  ? { ...m, content: errText, isError: true }
                  : m,
              ),
            };
          }),
        );
      }
    },
    [activeId, conversations, addMessage, getBackend],
  );

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0B0F17 0%, #111827 100%)",
      }}
    >
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onNewChat={createNewChat}
        onSelect={selectConversation}
        onDelete={deleteConversation}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <ChatArea
          conversation={activeConversation}
          onSend={(content) =>
            handleSendMessage(content, activeConversation?.id)
          }
          onNewChat={() => {
            const id = createNewChat();
            return id;
          }}
          onSendFromEmpty={(content) => handleSendMessage(content)}
        />
      </div>
      <Toaster />
    </div>
  );
}
