#!/bin/bash

# Script to update API types after server changes
echo "🔄 Updating API types..."

# Generate OpenAPI schema from server
echo "📝 Generating OpenAPI schema..."
cd server
npm run generate-schema

# Copy schema to client
echo "📋 Copying schema to client..."
cp openapi.json ../client/openapi.json

# Generate TypeScript types in client
echo "🔧 Generating TypeScript types..."
cd ../client
npm run generate-api-types

echo "✅ API types updated successfully!"
echo ""
echo "Next steps:"
echo "1. Start server: cd server && npm run dev"
echo "2. Start client: cd client && npm run dev"
echo "3. View API docs: http://localhost:3001/api-docs"
