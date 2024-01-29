import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  state: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [{
        role: 'user',
        content: [{
          type: 'text',
          text: 'この画像には何が写っているか教えてください'
        },{
          type: 'image_url',
          image_url: req.body.base64
        }]
      }],
      max_tokens: 300
    });

    res.status(200).json({ state: 'ok', data: chatCompletion.choices[0] });
  }
}
