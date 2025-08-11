import { Context } from './context';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

interface SendMessageArgs {
  message: string;
}

export const resolvers = {
  Query: {
    hello: () => 'Hello from AI Chat Backend!',
    health: () => ({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }),
  },
  Mutation: {
    sendMessage: async (
      _: unknown,
      { message }: SendMessageArgs,
      context: Context
    ) => {
      try {
        // Validate input
        if (!message || message.trim().length === 0) {
          return {
            response: '',
            error: 'Message cannot be empty',
          };
        }

        // Check for API key
        if (!context.env.OPENAI_API_KEY) {
          console.error('OpenAI API key is not configured');
          return {
            response: '',
            error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in environment variables.',
          };
        }

        // Create messages array for OpenAI
        const messages: ChatCompletionMessageParam[] = [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses. Support markdown formatting in your responses when appropriate.',
          },
          {
            role: 'user',
            content: message,
          },
        ];

        // Call OpenAI API
        const completion = await context.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        });

        const response = completion.choices[0]?.message?.content || 'No response generated';

        return {
          response,
          error: null,
        };
      } catch (error) {
        console.error('Error in sendMessage resolver:', error);
        
        // Handle specific error types
        if (error instanceof Error) {
          if (error.message.includes('401')) {
            return {
              response: '',
              error: 'Invalid OpenAI API key. Please check your configuration.',
            };
          }
          if (error.message.includes('429')) {
            return {
              response: '',
              error: 'Rate limit exceeded. Please try again later.',
            };
          }
          if (error.message.includes('timeout')) {
            return {
              response: '',
              error: 'Request timeout. Please try again.',
            };
          }
        }

        return {
          response: '',
          error: 'An error occurred while processing your message. Please try again.',
        };
      }
    },
  },
};