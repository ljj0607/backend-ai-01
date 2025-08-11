# AI Chat Tool Backend

A serverless GraphQL backend for AI chat applications, powered by **DeepSeek AI**, GraphQL Yoga, and Cloudflare Workers.

## Features

- 🚀 Serverless deployment on Cloudflare Workers
- 🔧 GraphQL API with GraphQL Yoga
- 🤖 **DeepSeek AI integration** (更经济实惠的选择)
- 📝 Full Markdown support in responses
- ⚡ Fast, scalable, and globally distributed
- 🔒 Secure API key management
- 🧪 Jest testing setup
- 📊 GraphQL Playground for API testing
- 💰 **Free credits for new users** (5 million tokens)

## Why DeepSeek?

- **Cost-effective**: ~1/10 the price of OpenAI
- **Free credits**: New users get 5 million free tokens
- **Chinese language support**: Excellent Chinese understanding
- **OpenAI compatible**: Uses the same SDK format

## Prerequisites

- Node.js 16+
- npm or yarn
- Cloudflare account (free tier works)
- **DeepSeek API key** (get from https://platform.deepseek.com)
- Wrangler CLI (installed via npm)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ljj0607/backend-ai-01.git
cd backend-ai-01
```

2. Install dependencies:
```bash
npm install
```

3. Get your DeepSeek API key:
   - Visit https://platform.deepseek.com
   - Register for a free account
   - Get your API key (starts with `sk-`)
   - New users receive 5 million free tokens!

4. Configure your DeepSeek API key:

**Option 1: Using Wrangler secrets (Recommended for production)**
```bash
wrangler secret put DEEPSEEK_API_KEY
# Enter your DeepSeek API key when prompted
```

**Option 2: Using .dev.vars file (For local development)**
```bash
echo "DEEPSEEK_API_KEY=sk-your-deepseek-api-key" > .dev.vars
```

## Development

Start the development server:
```bash
npm run dev
```

The GraphQL endpoint will be available at:
- GraphQL Endpoint: `http://localhost:8787/graphql`
- GraphQL Playground: `http://localhost:8787/graphql`

## API Schema

### Queries

```graphql
type Query {
  hello: String!
  health: HealthStatus!
}

type HealthStatus {
  status: String!
  timestamp: String!
  version: String!
}
```

### Mutations

```graphql
type Mutation {
  sendMessage(message: String!): ChatResponse!
}

type ChatResponse {
  response: String!
  error: String
}
```

## Testing the API

### Using GraphQL Playground

1. Open `http://localhost:8787/graphql` in your browser
2. Try these example queries:

**Health Check:**
```graphql
query HealthCheck {
  health {
    status
    timestamp
    version
  }
}
```

**Send a Message (Chinese):**
```graphql
mutation SendMessage {
  sendMessage(message: "什么是GraphQL？请用中文回答") {
    response
    error
  }
}
```

**Send a Message (English):**
```graphql
mutation SendMessage {
  sendMessage(message: "What is GraphQL?") {
    response
    error
  }
}
```

### Using cURL

```bash
# Health check
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { health { status timestamp version } }" }'

# Send message
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { sendMessage(message: \"你好!\") { response error } }" }'
```

## Running Tests

```bash
npm test
```

## Deployment

### Deploy to Cloudflare Workers

1. Login to Cloudflare:
```bash
wrangler login
```

2. Set your DeepSeek API key as a secret:
```bash
wrangler secret put DEEPSEEK_API_KEY
```

3. Deploy:
```bash
npm run deploy
```

4. Your API will be available at:
```
https://backend-ai-01.<your-subdomain>.workers.dev/graphql
```

### Environment-specific Deployments

**Staging:**
```bash
wrangler deploy --env staging
```

**Production:**
```bash
wrangler deploy --env production
```

## Project Structure

```
src/
├── index.ts           # Main entry point
├── schema.ts          # GraphQL schema setup
├── typeDefs.ts        # GraphQL type definitions
├── resolvers.ts       # GraphQL resolvers (DeepSeek integration)
├── context.ts         # GraphQL context setup (DeepSeek client)
└── utils/
    ├── messageHistory.ts  # Conversation history management
    └── validation.ts      # Input validation utilities
```

## Configuration

### wrangler.toml

The `wrangler.toml` file contains Cloudflare Workers configuration:
- Worker name
- Environment settings
- Build configuration

### Environment Variables

- `DEEPSEEK_API_KEY`: Your DeepSeek API key (required)

## Error Handling

The API includes comprehensive error handling for:
- Invalid or empty messages
- Missing API keys
- DeepSeek API errors
- Rate limiting
- Network timeouts
- Insufficient balance

## Security Best Practices

1. **Never commit API keys**: Use Wrangler secrets or environment variables
2. **CORS Configuration**: Configured for development; restrict origins in production
3. **Input Validation**: All user inputs are validated and sanitized
4. **Rate Limiting**: Consider implementing rate limiting for production

## Troubleshooting

### Common Issues

1. **"DeepSeek API key is not configured" error**
   - Ensure you've set the DEEPSEEK_API_KEY using `wrangler secret put` or in `.dev.vars`

2. **"Invalid API key" error**
   - Verify your DeepSeek API key is correct (should start with `sk-`)
   - Check your account at https://platform.deepseek.com

3. **"Insufficient balance" error**
   - Check your DeepSeek account balance
   - New users should have free credits available

4. **CORS errors in frontend**
   - Check the CORS configuration in `src/index.ts`
   - Ensure the frontend URL is allowed

5. **Deployment fails**
   - Run `wrangler whoami` to ensure you're logged in
   - Check your Cloudflare account has Workers enabled

## DeepSeek API Pricing

- **Input**: ¥1 / 1M tokens (~$0.14 USD)
- **Output**: ¥2 / 1M tokens (~$0.28 USD)
- **Free credits**: 5 million tokens for new users
- Much more affordable than OpenAI!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
