import { Sparkles } from "lucide-react";

interface TypingIndicatorProps {
  index: number;
}

export default function TypingIndicator({ index }: TypingIndicatorProps) {
  return (
    <div
      className="flex items-start gap-3 message-fade-in"
      data-ocid={`chat.loading_state.${index + 1}`}
    >
      <div
        className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: "#1A2233", border: "1px solid #223046" }}
      >
        <Sparkles className="w-4 h-4" style={{ color: "#4F6EF7" }} />
      </div>
      <div
        className="rounded-2xl rounded-tl-sm px-5 py-4"
        style={{ background: "#131B2C", border: "1px solid #223046" }}
      >
        <div className="flex items-center gap-1.5 h-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full typing-dot"
              style={{
                background: "#4F6EF7",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
