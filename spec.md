# Aura AI Chat

## Current State
New project with scaffolded Motoko backend and React frontend. HTTP outcalls component is selected.

## Requested Changes (Diff)

### Add
- AI chat interface with streaming-like responses
- Backend Motoko actor that calls an external AI API via HTTP outcalls
- Chat history stored per session (in-memory, frontend-managed)
- Multiple conversations support (sidebar list)
- New chat creation
- Typing/loading indicator while AI is generating response

### Modify
- Replace default app with full AI chat UI

### Remove
- Default placeholder content

## Implementation Plan
1. Backend: Motoko actor with `sendMessage(conversationHistory: [(Text, Text)]) -> async Text` that calls an AI API via HTTP outcalls
2. Frontend: Two-column layout (sidebar + main chat), chat bubbles, composer input, typing indicator
3. Wire frontend to backend actor for AI responses
4. Manage conversation history and multiple chats in React state
