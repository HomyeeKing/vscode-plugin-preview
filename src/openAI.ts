import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface Options {
  onError?: (msg: string) => void;
  /*@default text-davinci-003 */
  model?: string;
}

export const askAI = async (prompt: string, options: Options) => {
  const { model = 'text-davinci-003', onError } = options;
  try {
    const completion = await openai.createCompletion({
      model,
      prompt,
    });
    console.log(completion.data.choices[0].text);
  } catch (error: any) {
    onError && onError(error.message);
  }
};
