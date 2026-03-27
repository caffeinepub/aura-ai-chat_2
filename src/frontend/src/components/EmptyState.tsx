import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

const SUGGESTED_PROMPTS = [
  { label: "Explain quantum computing", icon: "⚛️" },
  { label: "Write a short story about a lost astronaut", icon: "🚀" },
  { label: "Help me debug this React useEffect hook", icon: "🛠️" },
  { label: "Summarize the history of the internet", icon: "🌐" },
];

interface EmptyStateProps {
  onSuggest: (prompt: string) => void;
}

export default function EmptyState({ onSuggest }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      data-ocid="chat.empty_state"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
          style={{
            background: "linear-gradient(135deg, #6D5EF7 0%, #3B82F6 100%)",
          }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#E5E7EB" }}
          >
            Aura AI
          </h2>
          <p className="text-base" style={{ color: "#9CA3AF" }}>
            Your intelligent assistant — ask me anything.
          </p>
        </div>

        {/* Suggested prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 w-full max-w-lg">
          {SUGGESTED_PROMPTS.map((p, i) => (
            <motion.button
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
              data-ocid={`empty.button.${(i + 1) as number}`}
              onClick={() => onSuggest(p.label)}
              className="flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-150 hover:scale-[1.02] active:scale-95"
              style={{
                background: "#131B2C",
                border: "1px solid #223046",
              }}
            >
              <span className="text-xl leading-none mt-0.5">{p.icon}</span>
              <span
                className="text-sm leading-snug"
                style={{ color: "#9CA3AF" }}
              >
                {p.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
