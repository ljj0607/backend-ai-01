import OpenAI from 'openai';
import { Env } from './index';

export interface Context {
  openai: OpenAI;
  env: Env;
}

export function createContext(env: Env): Context {
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  return {
    openai,
    env,
  };
}