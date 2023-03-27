import { AbortSignal } from 'node-fetch/externals';
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface AskAIReturnType {
  type: 'OK' | 'ERR';
  data: string;
}
interface Options {
  onError?: (msg: AskAIReturnType) => void;
  /*@default text-davinci-003 */
  model?: string;
  abortSignal?: AbortSignal;
}

let isRequesting = false;
/**
 * TODO:
 * - 请求控制
 * - 流式加载
 * @param prompt
 * @param options
 * @returns
 */
export const askAI = async (
  prompt: string,
  options: Options = {}
): Promise<AskAIReturnType | void> => {
  console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY);
  if (!isRequesting) {
    isRequesting = true;
    const { model = 'text-davinci-002', onError, abortSignal } = options;
    try {
      const completion = await openai.createCompletion(
        {
          model,
          prompt,
          max_tokens: 1000,
        },
        {
          timeout: 5000,
          timeoutErrorMessage: 'request timeout!',
          headers: {
            'Transfer-Encoding': 'chunked',
          },
          signal: abortSignal,
        }
      );
      isRequesting = false;
      return { data: completion.data.choices[0].text || '', type: 'OK' };
    } catch (error: any) {
      isRequesting = false;
      const payload: AskAIReturnType = {
        type: 'ERR',
        data: error.response
          ? error.response.data.error.message
          : error.messages,
      };
      onError && onError(payload);
      return payload;
    }
  }
};
