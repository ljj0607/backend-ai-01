# AI Chat Tool Backend

A serverless GraphQL backend for AI chat applications, powered by **DeepSeek AI**, GraphQL Yoga, and Cloudflare Workers.

## 🚀 Recent Updates

### v1.1.0 - DeepSeek API 集成修复 (2025-08-11)

**主要修复:**
- ✅ 修正了 DeepSeek API baseURL 端点配置 (`https://api.deepseek.com/v1`)
- 🔧 改进了错误处理和调试日志
- 📝 添加了详细的 API 测试脚本
- 🛡️ 增强了用户友好的错误消息
- 📊 添加了 API 使用统计信息记录

**解决的问题:**
- "APIError: 402 Insufficient Balance" 实际上是端点配置错误，而非余额问题
- API 密钥验证和错误处理逻辑优化
- 添加了更详细的调试信息便于问题排查

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

## Quick Start

1. **Clone and install:**
```bash
git clone https://github.com/ljj0607/backend-ai-01.git
cd backend-ai-01
npm install
```

2. **Get DeepSeek API key:**
   - Visit https://platform.deepseek.com
   - Register and get your API key (starts with `sk-`)
   - New users get 5M free tokens! 🎉

3. **Configure API key:**
```bash
# Create .dev.vars file
echo "DEEPSEEK_API_KEY=sk-your-actual-api-key-here" > .dev.vars
```

4. **Test your API key:**
```bash
# Run the test script
node scripts/test-deepseek-api.js
```

5. **Start development:**
```bash
npm run dev
```

Visit `http://localhost:8787/graphql` for GraphQL Playground!

## 🧪 Testing Your Setup

### Method 1: Using the Test Script
```bash
# Test DeepSeek API connection
node scripts/test-deepseek-api.js
```

### Method 2: Using GraphQL Playground
1. Open `http://localhost:8787/graphql`
2. Try this mutation:
```graphql
mutation TestChat {
  sendMessage(message: "你好，请介绍一下你自己") {
    response
    error
  }
}
```

### Method 3: Using cURL
```bash
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { sendMessage(message: \"Hello! Please introduce yourself\") { response error } }"
  }'
```

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

## Deployment

### 1. Login to Cloudflare
```bash
wrangler login
```

### 2. Set production secrets
```bash
wrangler secret put DEEPSEEK_API_KEY
# Enter your DeepSeek API key when prompted
```

### 3. Deploy
```bash
npm run deploy
```

Your API will be available at:
```
https://backend-ai-01.<your-subdomain>.workers.dev/graphql
```

## 🛠️ Project Structure

```
src/
├── index.ts           # Main entry point & server setup
├── schema.ts          # GraphQL schema configuration
├── typeDefs.ts        # GraphQL type definitions
├── resolvers.ts       # GraphQL resolvers (DeepSeek integration)
├── context.ts         # GraphQL context & DeepSeek client setup
└── utils/
    ├── messageHistory.ts  # Conversation history management
    └── validation.ts      # Input validation utilities

scripts/
└── test-deepseek-api.js   # API testing utility
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DEEPSEEK_API_KEY` | Your DeepSeek API key | Yes |

### wrangler.toml

The configuration file for Cloudflare Workers deployment includes:
- Worker name and compatibility settings
- Build configuration
- Environment-specific settings

## ❌ Common Issues & Solutions

### 1. "DeepSeek API key is not configured"
```bash
# Solution: Set your API key properly
echo "DEEPSEEK_API_KEY=sk-your-actual-key" > .dev.vars
```

### 2. "APIError: 402 Insufficient Balance"
**Note**: This error was often caused by incorrect baseURL configuration, not actual balance issues.

**Fixed in v1.1.0**: Corrected baseURL from `/v1/chat/completions` to `/v1`

### 3. "API call failed with status 401"
```bash
# Check your API key
node scripts/test-deepseek-api.js
```

### 4. Network or timeout errors
- Check your internet connection
- Verify firewall settings
- DeepSeek API might be temporarily unavailable

### 5. CORS issues in frontend
- Update CORS settings in `src/index.ts`
- Ensure your frontend URL is allowed

## 📊 DeepSeek API Pricing

- **Input**: ¥1 / 1M tokens (~$0.14 USD)
- **Output**: ¥2 / 1M tokens (~$0.28 USD)  
- **Free credits**: 5 million tokens for new users
- **Much more affordable than OpenAI!** 💰

## 🔍 Debugging Tips

1. **Enable detailed logging**: Check browser console and Wrangler logs
2. **Use the test script**: `node scripts/test-deepseek-api.js`
3. **Verify API key format**: Should start with `sk-` and be ~60+ characters
4. **Check DeepSeek account**: Visit https://platform.deepseek.com/usage
5. **Review error messages**: The app now provides detailed error feedback

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 💬 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/ljj0607/backend-ai-01/issues)
- 📖 **Documentation**: This README
- 🔗 **DeepSeek Platform**: https://platform.deepseek.com

---

**Made with ❤️ using DeepSeek AI, GraphQL, and Cloudflare Workers**
