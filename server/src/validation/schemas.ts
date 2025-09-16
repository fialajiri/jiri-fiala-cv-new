import { z } from 'zod';
import { AgentInputItem, protocol } from '@openai/agents';

// Use the official MessageItem schema from the protocol
export const ChatMessageSchema = protocol.MessageItem;

// Chat request schema
export const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  history: z.array(ChatMessageSchema).default([]),
});

// Chat response schema
export const ChatResponseSchema = z.object({
  message: z.string(),
  history: z.array(z.any()),
});

// Type exports
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

// Helper function to convert our validated data to AgentInputItem[]
export const toAgentInputItems = (messages: ChatMessage[]): AgentInputItem[] => {
  return messages as AgentInputItem[];
};
