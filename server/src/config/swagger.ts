import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Jiri Fiala CV API',
    version: '1.0.0',
    description: 'API for Jiri Fiala CV application with chat functionality',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      ChatMessage: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
            enum: ['user', 'assistant', 'system'],
            description: 'The role of the message sender',
          },
          content: {
            type: 'string',
            description: 'The content of the message',
          },
        },
        required: ['role', 'content'],
      },
      ChatRequest: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The user message to process',
            minLength: 1,
          },
          history: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ChatMessage',
            },
            description: 'Previous conversation history',
            default: [],
          },
        },
        required: ['message'],
      },
      ChatResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The assistant response message',
          },
          history: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ChatMessage',
            },
            description: 'Updated conversation history including the new messages',
          },
        },
        required: ['message', 'history'],
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message',
          },
        },
        required: ['error'],
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
