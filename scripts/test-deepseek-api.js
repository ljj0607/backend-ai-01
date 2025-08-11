#!/usr/bin/env node

/**
 * DeepSeek API 测试脚本
 * 用于验证API密钥是否正常工作
 * 
 * 使用方法：
 * 1. 设置环境变量：export DEEPSEEK_API_KEY=sk-your-key-here
 * 2. 运行：node scripts/test-deepseek-api.js
 */

const API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-6385b01e34cd4c3db0f07378ae77ede7';

async function testDeepSeekAPI() {
  console.log('🔄 正在测试DeepSeek API连接...');
  console.log('🔑 使用API密钥:', API_KEY.substring(0, 10) + '...');
  
  try {
    // 修复：使用正确的DeepSeek API端点
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: '你好，请简单介绍一下你自己'
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
        stream: false,
      }),
    });

    console.log('📊 响应状态:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API调用失败:');
      console.error('状态码:', response.status);
      console.error('错误信息:', errorText);
      
      if (response.status === 401) {
        console.error('💡 建议：请检查您的API密钥是否正确');
      } else if (response.status === 402) {
        console.error('💡 建议：请检查您的账户余额');
      } else if (response.status === 429) {
        console.error('💡 建议：请求频率过高，请稍后再试');
      }
      
      return;
    }

    const data = await response.json();
    console.log('✅ API调用成功!');
    console.log('🤖 AI回复:', data.choices[0].message.content);
    console.log('📈 令牌使用统计:', {
      prompt_tokens: data.usage?.prompt_tokens,
      completion_tokens: data.usage?.completion_tokens,
      total_tokens: data.usage?.total_tokens
    });

    console.log('\n🎉 测试完成！DeepSeek API工作正常');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    
    if (error.message.includes('fetch')) {
      console.error('💡 建议：请检查网络连接');
    }
  }
}

// 运行测试
testDeepSeekAPI();
