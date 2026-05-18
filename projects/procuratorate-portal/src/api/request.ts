/** 模拟请求延迟（毫秒） */
const MOCK_DELAY = 300

/** 模拟 API 请求，返回 Promise，附带延迟 */
export function mockRequest<T>(data: T, delay = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

/** 模拟错误 */
export function mockError(message: string, delay = MOCK_DELAY): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}
