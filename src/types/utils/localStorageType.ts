
export interface CustomStorage {
    getItem<T>(key: string): Promise<T | null> | T;
    setItem<T>(key: string, value: T): Promise<T | null> | T;
}

export interface localStorageType {
    // ǰ׺, Ĭ��ֵ�� ""
    prefix?: string;
    // ��׺ Ĭ��ֵ�� ""
    suffix?: string;
    // ���ݿ�����, Ĭ��ֵ��Vue3PersistStorage
    name?: string;
    // ���ݿ��б�����Ĭ��ֵ��DataShee
    storeName?: string;
    // ����ģʽ����ԭʧ�ܴ�ӡ������ѡ��
    debug?: boolean;
    // �Ƿ������ܹ���
    encryption?: boolean
    // storage���ͣ���localStorage��sessionStroage����ѡ��
    storage?: Storage | CustomStorage;
    // �Ƿ�����Ч��, Ĭ��ֵ��false
    isOpenExpires?: boolean;
    // ��Ч��Ĭ�ϼ���, Ĭ��ֵ: 7��
    day?: number;
}