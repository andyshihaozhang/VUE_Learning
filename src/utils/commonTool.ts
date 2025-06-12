import * as CryptoJS from "crypto-js"

/**
 * 深拷贝
 * @param obj - 需要深拷贝的对象
 * @returns 深拷贝后的对象
 */
export function jsonClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
} 

/**
 * 计算有效期的时间，单位：秒
 * @param day 有效期的天数，单位：天
 * @returns 有效期的毫秒级时间戳
 */
export function getExpiresTime(day: number): number {
  return 60 * 60 * 24 * day * 1000
}

/**
* 生成键值
* @param key 键值
* @param prefix 前缀
* @param suffix 后缀
* @returns 输出键值，例如指定前缀：Login。那么返回的是：LOGIN_KEY
*/
export function getKey(key: string, prefix = "", suffix = ""): string {
  return `${prefix}${prefix ? '_' : ''}${key}${suffix ? '_' : ''}${suffix}`;
}

/**
 * 根据加密解密的参数决定是否对值进行加密解密
 * 解密方法
 * @param key 键值
 * @param value 值
 */
export function handleDecryptData(key: string, value: string) {
  // 统一用对象保存，boolean, array, object, string,number等基本类型的值，也方便到时候解密
  const bytes = CryptoJS.AES.decrypt(value, key)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).encryptValue;
}

/**
 * 根据加密解密的参数决定是否对值进行加密解密
 * 加密方法
 * @param encryption 
 */
export function handleEncryptData(key: string, value: any) {
  // 统一用对象保存，boolean, array, object, string,number等基本类型的值，也方便到时候解密
  const data = {
      encryptValue: value
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

/**
 * 随机生成任意长度的随机数
 * @param size 需要生成随机数据的长度
 * @returns 
 */
export const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

/**
 * 设置AES加密的密钥
 * @param encryption 是否开启AES加密
 * @returns 密钥字符串
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