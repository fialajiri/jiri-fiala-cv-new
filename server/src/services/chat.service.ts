import { run } from '@openai/agents';
import { createChatAgent } from '../chat/agents/chat-agent';
import { ChatMessage, ChatResponse, toAgentInputItems } from '../validation/schemas';

class ChatService {
  async processMessage(message: string, history: ChatMessage[]): Promise<ChatResponse> {
    const chatAgent = await createChatAgent();

    const newMessage = {
      role: 'user' as const,
      content: message,
      type: 'message' as const,
    };

    const allMessages = [...history, newMessage];
    const agentInputItems = toAgentInputItems(allMessages);
    const response = await run(chatAgent, agentInputItems, {
      stream: true,
    });

    return {
      message: response.finalOutput as string,
      history: response.history,
    };
  }

  async *processMessageStream(
    message: string,
    history: ChatMessage[],
  ): AsyncGenerator<
    { type: 'chunk' | 'done'; content?: string; history?: ChatMessage[] },
    void,
    unknown
  > {
    const chatAgent = await createChatAgent();

    const newMessage = {
      role: 'user' as const,
      content: message,
      type: 'message' as const,
    };

    const allMessages = [...history, newMessage];
    const agentInputItems = toAgentInputItems(allMessages);
    const response = await run(chatAgent, agentInputItems, {
      stream: true,
    });

    // Stream the response text
    const textStream = response.toTextStream({
      compatibleWithNodeStreams: false,
    });

    for await (const chunk of textStream) {
      yield { type: 'chunk', content: chunk };
    }

    // Wait for completion to get the final result with history
    await response.completed;

    // Yield the final result with history
    yield {
      type: 'done',
      history: response.history as ChatMessage[],
    };
  }
}

export const chatService = new ChatService();
