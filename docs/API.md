# API Documentation

## GraphQL Endpoint

**Development:** `http://localhost:8787/graphql`  
**Production:** `https://backend-ai-01.<your-subdomain>.workers.dev/graphql`

## Authentication

Currently, the API doesn't require authentication. For production use, consider implementing:
- API keys
- JWT tokens
- OAuth 2.0

## GraphQL Schema

### Queries

#### hello
Returns a simple greeting message.

**Request:**
```graphql
query {
  hello
}
```

**Response:**
```json
{
  "data": {
    "hello": "Hello from AI Chat Backend!"
  }
}
```

#### health
Returns the health status of the service.

**Request:**
```graphql
query {
  health {
    status
    timestamp
    version
  }
}
```

**Response:**
```json
{
  "data": {
    "health": {
      "status": "healthy",
      "timestamp": "2024-01-01T12:00:00.000Z",
      "version": "1.0.0"
    }
  }
}
```

### Mutations

#### sendMessage
Sends a message to the AI and receives a response.

**Request:**
```graphql
mutation SendMessage($message: String!) {
  sendMessage(message: $message) {
    response
    error
  }
}
```

**Variables:**
```json
{
  "message": "What is GraphQL?"
}
```

**Success Response:**
```json
{
  "data": {
    "sendMessage": {
      "response": "GraphQL is a query language for APIs...",
      "error": null
    }
  }
}
```

**Error Response:**
```json
{
  "data": {
    "sendMessage": {
      "response": "",
      "error": "Message cannot be empty"
    }
  }
}
```

## Error Codes

| Error Message | Description | Solution |
|--------------|-------------|----------|
| "Message cannot be empty" | Empty or whitespace-only message | Provide a valid message |
| "Message is too long" | Message exceeds 4000 characters | Shorten the message |
| "OpenAI API key is not configured" | Missing API key | Set OPENAI_API_KEY |
| "Invalid OpenAI API key" | Invalid or expired API key | Check your OpenAI API key |
| "Rate limit exceeded" | Too many requests | Wait and retry |
| "Request timeout" | Network timeout | Retry the request |

## Rate Limiting

Currently, there are no rate limits implemented at the API level. However:
- OpenAI API has its own rate limits
- Cloudflare Workers have request limits based on your plan

For production, consider implementing:
- Per-user rate limiting
- Request throttling
- Queue management

## WebSocket Support

GraphQL Yoga supports subscriptions via WebSocket. To enable real-time features:

```graphql
type Subscription {
  messageStream: ChatResponse!
}
```

This is not currently implemented but can be added for real-time chat features.