/**
 * HTTP ״̬��ö��
 */
export enum HttpStatusCode {
  // 2xx �ɹ�
  OK = 200,                    // ����ɹ�
  CREATED = 201,               // �����ɹ�
  ACCEPTED = 202,              // �����ѽ���
  NO_CONTENT = 204,            // ����ɹ����޷�������

  // 3xx �ض���
  MOVED_PERMANENTLY = 301,     // �����ض���
  FOUND = 302,                 // ��ʱ�ض���
  NOT_MODIFIED = 304,          // ��Դδ�޸�

  // 4xx �ͻ��˴���
  BAD_REQUEST = 400,           // �����������
  UNAUTHORIZED = 401,          // δ��Ȩ��δ��¼��
  FORBIDDEN = 403,             // ��ֹ���ʣ���Ȩ�ޣ�
  NOT_FOUND = 404,             // ��Դ������
  METHOD_NOT_ALLOWED = 405,    // ���󷽷�������
  REQUEST_TIMEOUT = 408,       // ����ʱ
  CONFLICT = 409,              // ��Դ��ͻ
  GONE = 410,                  // ��Դ��ɾ��
  UNPROCESSABLE_ENTITY = 422,  // ������֤ʧ��
  TOO_MANY_REQUESTS = 429,     // �������Ƶ��

  // 5xx ����������
  INTERNAL_SERVER_ERROR = 500, // �������ڲ�����
  NOT_IMPLEMENTED = 501,       // ����δʵ��
  BAD_GATEWAY = 502,           // ���ش���
  SERVICE_UNAVAILABLE = 503,   // ���񲻿���
  GATEWAY_TIMEOUT = 504,       // ���س�ʱ
}

/**
 * HTTP ״̬���Ӧ�Ĵ�����Ϣ
 */
export const HttpStatusMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.OK]: '����ɹ�',
  [HttpStatusCode.CREATED]: '�����ɹ�',
  [HttpStatusCode.ACCEPTED]: '�����ѽ���',
  [HttpStatusCode.NO_CONTENT]: '����ɹ����޷�������',

  [HttpStatusCode.MOVED_PERMANENTLY]: '��Դ�������ƶ�',
  [HttpStatusCode.FOUND]: '��Դ����ʱ�ƶ�',
  [HttpStatusCode.NOT_MODIFIED]: '��Դδ�޸�',

  [HttpStatusCode.BAD_REQUEST]: '�����������',
  [HttpStatusCode.UNAUTHORIZED]: '���ȵ�¼',
  [HttpStatusCode.FORBIDDEN]: '��Ȩ�޷���',
  [HttpStatusCode.NOT_FOUND]: '�������Դ������',
  [HttpStatusCode.METHOD_NOT_ALLOWED]: '���󷽷�������',
  [HttpStatusCode.REQUEST_TIMEOUT]: '����ʱ',
  [HttpStatusCode.CONFLICT]: '��Դ��ͻ',
  [HttpStatusCode.GONE]: '��Դ��ɾ��',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: '������֤ʧ��',
  [HttpStatusCode.TOO_MANY_REQUESTS]: '�������Ƶ�������Ժ�����',

  [HttpStatusCode.INTERNAL_SERVER_ERROR]: '�������ڲ�����',
  [HttpStatusCode.NOT_IMPLEMENTED]: '����δʵ��',
  [HttpStatusCode.BAD_GATEWAY]: '���ش���',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: '������ʱ������',
  [HttpStatusCode.GATEWAY_TIMEOUT]: '���س�ʱ',
}

/**
 * ��ȡ״̬���Ӧ�Ĵ�����Ϣ
 * @param status HTTP״̬��
 * @returns ��Ӧ�Ĵ�����Ϣ
 */
export function getHttpStatusMessage(status: HttpStatusCode): string {
  return HttpStatusMessage[status] || 'δ֪����'
}
