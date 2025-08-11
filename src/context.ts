import OpenAI from 'openai';
import { Env } from './index';

export interface Context {
  deepseek: OpenAI;  // 改名为 deepseek 但仍使用 OpenAI SDK
  env: Env;
}

export function createContext(env: Env): Context {
  // DeepSeek API 兼容 OpenAI SDK，只需要修改 baseURL
  const deepseek = new OpenAI({
    apiKey: env.DEEPSEEK_API_KEY || 'dummy-key',
    baseURL: 'https://api.deepseek.com/v1',  // DeepSeek API 端点
  });

  return {
    deepseek,
    env,
  };
}
