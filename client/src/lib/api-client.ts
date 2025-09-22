import axios, { type AxiosInstance } from 'axios';
import type { paths } from '../types/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
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

export const api = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post('/chat', data);
    return response.data;
  },
  getSystemInfo: async () => {
    const response = await axios.get('https://ipapi.co/json/');
    return response.data;
  },
};

export default apiClient;
