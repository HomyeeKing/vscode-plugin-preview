import { OpenAIApi, Configuration } from 'openai';
import { getConfigFromSettingJson } from './utils';

const configuration = new Configuration({
  apiKey: getConfigFromSettingJson('OPENAI_API_KEY'),
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
 * @param prompt
 * @param options
 * @returns
 */
export const askAI = async (
  prompt: string,
  options: Options = {}
): Promise<AskAIReturnType | void> => {
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
