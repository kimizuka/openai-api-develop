import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

(async () => {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'user',
      content: [{
        type: 'text',
        text: 'なにか適当な日本語を話してみてください'
      }]
    }]
  });

  console.log(chatCompletion.choices[0]);
})();