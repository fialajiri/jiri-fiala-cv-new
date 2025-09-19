import { Agent } from '@openai/agents';
import { createSystemPrompt } from '../promts/system-prompt';

export const createChatAgent = async () => {
  const instructions1 = await createSystemPrompt();

  const chatAgent = new Agent({
    name: 'Jiri Fiala Digital Projection',
    instructions: instructions1,
    model: 'gpt-4o-mini',
  });

  return chatAgent;
};
