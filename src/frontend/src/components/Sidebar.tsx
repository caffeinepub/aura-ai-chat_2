import { MessageSquare, Plus, Sparkles, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Conversation } from "../App";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Sidebar({
  conversations,
  activeId,
  onNewChat,
  onSelect,
  onDelete,
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <aside
      className="flex flex-col h-full w-72 shrink-0 border-r"
      style={{
        background: "#0F172A",
        borderColor: "#223046",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #6D5EF7 0%, #3B82F6 100%)",
          }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ color: "#E5E7EB" }}
        >
          Aura AI
        </span>
      </div>

      {/* New Chat Button */}
      <div className="px-3 pb-3">
        <button
          type="button"
          data-ocid="sidebar.primary_button"
          onClick={onNewChat}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #4F6EF7, #6D5EF7)",
            color: "#fff",
          }}
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Divider */}
      <div
        className="mx-5 mb-3"
        style={{ height: "1px", background: "#223046" }}
      />

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {conversations.length === 0 && (
          <p className="text-xs px-3 py-2" style={{ color: "#6B7280" }}>
            No conversations yet
          </p>
        )}
        <AnimatePresence initial={false}>
          {conversations.map((conv, idx) => {
            const isActive = conv.id === activeId;
            const isHovered = hoveredId === conv.id;
            return (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                data-ocid={`sidebar.item.${idx + 1}`}
                className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150"
                style={{
                  background: isActive
                    ? "rgba(79,110,247,0.15)"
                    : isHovered
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                  borderLeft: isActive
                    ? "2px solid #4F6EF7"
                    : "2px solid transparent",
                }}
                onClick={() => onSelect(conv.id)}
                onMouseEnter={() => setHoveredId(conv.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <MessageSquare
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: isActive ? "#4F6EF7" : "#6B7280" }}
                />
                <span
                  className="text-sm truncate flex-1 min-w-0"
                  style={{ color: isActive ? "#E5E7EB" : "#9CA3AF" }}
                >
                  {conv.title}
                </span>
                {(isHovered || isActive) && (
                  <button
                    type="button"
                    data-ocid={`sidebar.delete_button.${idx + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity"
                    style={{ color: "#9CA3AF" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 mt-auto">
        <div className="h-px mb-3" style={{ background: "#223046" }} />
        <p className="text-xs" style={{ color: "#4B5563" }}>
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#6B7280" }}
          >
            Built with caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}
