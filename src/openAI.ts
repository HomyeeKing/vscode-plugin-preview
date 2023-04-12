// import { OpenAIApi, Configuration } from 'openai';
// import { getConfigFromSettingJson } from './utils';

// interface AIConfig {
//   /**@default text-davinci-002 */
//   model?: string;
//   OPENAI_API_KEY: string;
// }
// const aiConfig = getConfigFromSettingJson<AIConfig>('ai');

// const configuration = new Configuration({
//   apiKey: aiConfig?.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// interface AskAIReturnType {
//   type: 'OK' | 'ERR';
//   data: string;
// }
// interface Options {
//   onError?: (msg: AskAIReturnType) => void;
//   /*@default text-davinci-002 */
//   model?: string;
//   abortSignal?: AbortSignal;
// }

// /**
//  * @param prompt
//  * @param options
//  * @returns
//  */
// export const askAI = async (
//   prompt: string,
//   options: Options = {}
// ): Promise<AskAIReturnType | void> => {
//   const {
//     model = aiConfig?.model || 'text-davinci-002',
//     onError,
//     abortSignal,
//   } = options;
//   try {
//     const completion = await openai.createCompletion(
//       {
//         model,
//         prompt,
//         max_tokens: 1000,
//       },
//       {
//         timeout: 5000,
//         timeoutErrorMessage: 'request timeout!',
//         headers: {
//           'Transfer-Encoding': 'chunked',
//         },
//         signal: abortSignal,
//       }
//     );
//     return { data: completion.data.choices[0].text || '', type: 'OK' };
//   } catch (error: any) {
//     const payload: AskAIReturnType = {
//       type: 'ERR',
//       data: error.response ? error.response.data.error.message : error.message,
//     };
//     onError && onError(payload);
//     return payload;
//   }
// };
