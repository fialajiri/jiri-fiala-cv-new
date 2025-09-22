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
  ping: async (
    url: string
  ): Promise<{
    url: string;
    status: number;
    time: number;
    success: boolean;
    error?: string;
  }> => {
    const startTime = Date.now();

    return new Promise(resolve => {
      try {
        // Add protocol if missing
        const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;

        // Try multiple common endpoints that most sites have
        const testUrls = [
          `${urlWithProtocol}/favicon.ico?ping=${Date.now()}`,
          `${urlWithProtocol}/robots.txt?ping=${Date.now()}`,
          `${urlWithProtocol}/?ping=${Date.now()}`,
        ];

        let currentUrlIndex = 0;

        const tryNextUrl = () => {
          if (currentUrlIndex >= testUrls.length) {
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            resolve({
              url: urlWithProtocol,
              status: 404,
              time: responseTime,
              success: false,
              error: 'Server not reachable',
            });
            return;
          }

          const testUrl = testUrls[currentUrlIndex];
          const img = new Image();

          // Set timeout for this specific URL
          const timeout = setTimeout(() => {
            currentUrlIndex++;
            tryNextUrl();
          }, 3000);

          img.onload = () => {
            clearTimeout(timeout);
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            resolve({
              url: urlWithProtocol,
              status: 200,
              time: responseTime,
              success: true,
            });
          };

          img.onerror = () => {
            clearTimeout(timeout);
            currentUrlIndex++;
            tryNextUrl();
          };

          // Start the ping by setting the image source
          img.src = testUrl;
        };

        // Start trying URLs
        tryNextUrl();
      } catch (error) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        resolve({
          url: url.startsWith('http') ? url : `https://${url}`,
          status: 0,
          time: responseTime,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });
  },
};

export default apiClient;
