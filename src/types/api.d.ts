// API ��Ӧ����
declare interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// �û��������
declare interface User {
  id: number
  username: string
  email: string
  // �����û�����...
}

// ������Ӹ��� API ��ص��������� 