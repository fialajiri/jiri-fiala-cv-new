import axios, { type AxiosInstance } from 'axios';
import type { paths } from '../types/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type definitions for our API
export type ChatRequest =
  paths['/chat']['post']['requestBody']['content']['application/json'];
export type ChatResponse =
  paths['/chat']['post']['responses']['200']['content']['application/json'];
export type ChatMessage = ChatRequest['history'][0];

// API functions
export const api = {
  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await apiClient.get('/');
    return response.data;
  },

  // Chat
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post('/chat', data);
    return response.data;
  },
};

export default apiClient;
