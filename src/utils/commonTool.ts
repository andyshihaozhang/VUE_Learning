import * as CryptoJS from "crypto-js"

/**
 * ���
 * @param obj - ��Ҫ����Ķ���
 * @returns �����Ķ���
 */
export function jsonClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
} 

/**
 * ������Ч�ڵ�ʱ�䣬��λ����
 * @param day ��Ч�ڵ���������λ����
 * @returns ��Ч�ڵĺ��뼶ʱ���
 */
export function getExpiresTime(day: number): number {
  return 60 * 60 * 24 * day * 1000
}

/**
* ���ɼ�ֵ
* @param key ��ֵ
* @param prefix ǰ׺
* @param suffix ��׺
* @returns �����ֵ������ָ��ǰ׺��Login����ô���ص��ǣ�LOGIN_KEY
*/
export function getKey(key: string, prefix = "", suffix = ""): string {
  return `${prefix}${prefix ? '_' : ''}${key}${suffix ? '_' : ''}${suffix}`;
}

/**
 * ���ݼ��ܽ��ܵĲ��������Ƿ��ֵ���м��ܽ���
 * ���ܷ���
 * @param key ��ֵ
 * @param value ֵ
 */
export function handleDecryptData(key: string, value: string) {
  // ͳһ�ö��󱣴棬boolean, array, object, string,number�Ȼ������͵�ֵ��Ҳ���㵽ʱ�����
  const bytes = CryptoJS.AES.decrypt(value, key)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).encryptValue;
}

/**
 * ���ݼ��ܽ��ܵĲ��������Ƿ��ֵ���м��ܽ���
 * ���ܷ���
 * @param encryption 
 */
export function handleEncryptData(key: string, value: any) {
  // ͳһ�ö��󱣴棬boolean, array, object, string,number�Ȼ������͵�ֵ��Ҳ���㵽ʱ�����
  const data = {
      encryptValue: value
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

/**
 * ����������ⳤ�ȵ������
 * @param size ��Ҫ����������ݵĳ���
 * @returns 
 */
export const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

/**
 * ����AES���ܵ���Կ
 * @param encryption �Ƿ���AES����
 * @returns ��Կ�ַ���
 */
export function setEncryptionKey(encryption: boolean): string {
    const radomHex = localStorage.getItem('uuid')
    let uuid = ''
    if (radomHex) {
        uuid = radomHex
    } else {
        const _uuid = genRanHex(16);
        localStorage.setItem('uuid', _uuid)
        uuid = _uuid
    }
    return encryption ? uuid : ''
}