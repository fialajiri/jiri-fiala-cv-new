# API Setup with OpenAPI and TanStack Query

This project now includes a complete OpenAPI schema generation and typed API client setup.

## Server Side (OpenAPI Schema Generation)

### Dependencies Added
- `swagger-jsdoc` - Generate OpenAPI specs from JSDoc comments
- `swagger-ui-express` - Serve Swagger UI documentation
- `@types/swagger-jsdoc` - TypeScript types
- `@types/swagger-ui-express` - TypeScript types

### Files Created/Modified
- `server/src/config/swagger.ts` - OpenAPI configuration and schema definitions
- `server/src/server.ts` - Added Swagger UI endpoint at `/api-docs`
- `server/src/routes/chat.ts` - Added OpenAPI documentation comments
- `server/src/routes/index.ts` - Added OpenAPI documentation comments
- `server/package.json` - Added `generate-schema` script

### Usage
1. Start the server: `cd server && npm run dev`
2. View API documentation: http://localhost:3001/api-docs
3. Generate schema file: `cd server && npm run generate-schema`

## Client Side (Typed API Client)

### Dependencies Added
- `@tanstack/react-query` - Data fetching and caching
- `@tanstack/react-query-devtools` - Development tools
- `openapi-typescript` - Generate TypeScript types from OpenAPI schema
- `axios` - HTTP client

### Files Created
- `client/src/types/api.ts` - Generated TypeScript types from OpenAPI schema
- `client/src/lib/api-client.ts` - Typed API client using axios
- `client/src/hooks/use-api.ts` - React Query hooks for API calls
- `client/src/App.tsx` - Updated to use real API instead of mock

### Usage
1. Generate API types: `cd client && npm run generate-api-types`
2. Start the client: `cd client && npm run dev`
3. The app now uses the real API with full TypeScript support

## Workflow

1. **Update API**: Modify server routes and add OpenAPI documentation
2. **Generate Schema**: Run `cd server && npm run generate-schema`
3. **Copy Schema**: The schema is automatically copied to client directory
4. **Generate Types**: Run `cd client && npm run generate-api-types`
5. **Use Typed API**: The client now has full type safety for API calls

## Features

- ✅ OpenAPI 3.0 schema generation from JSDoc comments
- ✅ Swagger UI documentation at `/api-docs`
- ✅ TypeScript types generated from OpenAPI schema
- ✅ Typed API client with axios
- ✅ React Query integration for caching and state management
- ✅ Full type safety for API requests and responses
- ✅ Development tools for debugging queries

## API Endpoints

- `GET /` - Health check
- `POST /chat` - Send chat message

Both endpoints are fully documented in the OpenAPI schema and have corresponding TypeScript types.
