import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ComposerProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function Composer({ onSend, disabled }: ComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: resize on value change
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex items-end gap-3 rounded-2xl px-4 py-3"
      style={{
        background: "#131B2C",
        border: "1px solid #2A3550",
        boxShadow: "0 0 0 1px rgba(79,110,247,0.06)",
      }}
    >
      <textarea
        data-ocid="composer.textarea"
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything…"
        disabled={disabled}
        className="flex-1 resize-none bg-transparent text-sm outline-none leading-relaxed"
        style={{
          color: "#E5E7EB",
          caretColor: "#4F6EF7",
        }}
      />
      <button
        type="button"
        data-ocid="composer.submit_button"
        onClick={handleSend}
        disabled={!canSend}
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150"
        style={{
          background: canSend
            ? "linear-gradient(135deg, #4F6EF7, #6D5EF7)"
            : "#1A2233",
          color: canSend ? "#fff" : "#4B5563",
          cursor: canSend ? "pointer" : "default",
        }}
      >
        <SendHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
