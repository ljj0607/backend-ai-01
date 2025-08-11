import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { createContext } from './context';

export interface Env {
  OPENAI_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const yoga = createYoga({
      schema,
      context: () => createContext(env),
      cors: {
        origin: '*',
        credentials: true,
        methods: ['POST', 'GET', 'OPTIONS'],
      },
      graphqlEndpoint: '/graphql',
      landingPage: true,
    });

    return yoga.handle(request, ctx);
  },
};