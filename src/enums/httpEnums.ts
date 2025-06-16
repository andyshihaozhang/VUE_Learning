/**
 * HTTP 状态码枚举
 */
export enum HttpStatusCode {
  // 2xx 成功
  OK = 200,                    // 请求成功
  CREATED = 201,               // 创建成功
  ACCEPTED = 202,              // 请求已接受
  NO_CONTENT = 204,            // 请求成功但无返回内容

  // 3xx 重定向
  MOVED_PERMANENTLY = 301,     // 永久重定向
  FOUND = 302,                 // 临时重定向
  NOT_MODIFIED = 304,          // 资源未修改

  // 4xx 客户端错误
  BAD_REQUEST = 400,           // 请求参数错误
  UNAUTHORIZED = 401,          // 未授权（未登录）
  FORBIDDEN = 403,             // 禁止访问（无权限）
  NOT_FOUND = 404,             // 资源不存在
  METHOD_NOT_ALLOWED = 405,    // 请求方法不允许
  REQUEST_TIMEOUT = 408,       // 请求超时
  CONFLICT = 409,              // 资源冲突
  GONE = 410,                  // 资源已删除
  UNPROCESSABLE_ENTITY = 422,  // 参数验证失败
  TOO_MANY_REQUESTS = 429,     // 请求过于频繁

  // 5xx 服务器错误
  INTERNAL_SERVER_ERROR = 500, // 服务器内部错误
  NOT_IMPLEMENTED = 501,       // 功能未实现
  BAD_GATEWAY = 502,           // 网关错误
  SERVICE_UNAVAILABLE = 503,   // 服务不可用
  GATEWAY_TIMEOUT = 504,       // 网关超时
}

/**
 * HTTP 状态码对应的错误信息
 */
export const HttpStatusMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.OK]: '请求成功',
  [HttpStatusCode.CREATED]: '创建成功',
  [HttpStatusCode.ACCEPTED]: '请求已接受',
  [HttpStatusCode.NO_CONTENT]: '请求成功但无返回内容',

  [HttpStatusCode.MOVED_PERMANENTLY]: '资源已永久移动',
  [HttpStatusCode.FOUND]: '资源已临时移动',
  [HttpStatusCode.NOT_MODIFIED]: '资源未修改',

  [HttpStatusCode.BAD_REQUEST]: '请求参数错误',
  [HttpStatusCode.UNAUTHORIZED]: '请先登录',
  [HttpStatusCode.FORBIDDEN]: '无权限访问',
  [HttpStatusCode.NOT_FOUND]: '请求的资源不存在',
  [HttpStatusCode.METHOD_NOT_ALLOWED]: '请求方法不允许',
  [HttpStatusCode.REQUEST_TIMEOUT]: '请求超时',
  [HttpStatusCode.CONFLICT]: '资源冲突',
  [HttpStatusCode.GONE]: '资源已删除',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: '参数验证失败',
  [HttpStatusCode.TOO_MANY_REQUESTS]: '请求过于频繁，请稍后再试',

  [HttpStatusCode.INTERNAL_SERVER_ERROR]: '服务器内部错误',
  [HttpStatusCode.NOT_IMPLEMENTED]: '功能未实现',
  [HttpStatusCode.BAD_GATEWAY]: '网关错误',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: '服务暂时不可用',
  [HttpStatusCode.GATEWAY_TIMEOUT]: '网关超时',
}

/**
 * 获取状态码对应的错误信息
 * @param status HTTP状态码
 * @returns 对应的错误信息
 */
export function getHttpStatusMessage(status: HttpStatusCode): string {
  return HttpStatusMessage[status] || '未知错误'
}
