import type { localStorageType } from '@/types/utils/localStorageType';
import { getExpiresTime, 
    getKey, 
    handleDecryptData, 
    handleEncryptData, 
    setEncryptionKey 
} from '@/utils/commonTool';



export class CreateStorage {
    /** Ĭ��ֵ�� localStorage*/
    private storage: Storage;
    /** ǰ׺�����Զ��ӵ� key ֵ��ǰ�棬Ĭ��ֵ��'' */
    private prefix: string;
    /** ��׺�����Զ��ӵ� key ֵ�ĺ���,Ĭ��ֵ��''*/
    private suffix: string;
    /** �Ƿ�����Ч������,Ĭ��ֵ��false */
    private isOpenExpires: boolean;
    /** ��Ч�����ã���isOpenExpires���ʹ�ã���λ����, Ĭ��ֵ��7 �� */
    private day: number
    /** �Ƿ���AES���ܺͽ������ݣ� Ĭ��ֵ��false */
    private encryption: boolean;
    /** ����ʱ��Ҫ����Կ���Զ����ɣ�����Ҫ���� */
    private encryptionKey: string
    constructor(type: localStorageType = {}) {
        const { prefix = '', suffix = '', storage = localStorage, isOpenExpires = false, day = 7, encryption = false } = type
        this.storage = storage as Storage;
        this.prefix = prefix
        this.suffix = suffix
        this.encryption = encryption
        this.isOpenExpires = isOpenExpires ?? false
        this.day = day ?? 7
        this.encryptionKey = setEncryptionKey(this.encryption)
    }

    /**
     * @description ���û���
     * @param key �����
     * @param value ����ֵ
     * @param expires ����ʱ��
     * @param isOpen �Ƿ�������ʱ��ļ���
     */
    setItem(key: string, value: any, expires: number | null = this.day, isOpen: boolean | null = this.isOpenExpires) {
        const stringData = isOpen ? JSON.stringify({
            value,
            expires: expires !== null ? new Date().getTime() + getExpiresTime(expires) : null
        }) : JSON.stringify(value)
        this.storage.setItem(getKey(key, this.prefix, this.suffix), this.encryption ? handleEncryptData(this.encryptionKey, stringData) : stringData)
    }

    /**
     * @description ��ȡ����
     * @param {string} key �����
     * @param {any} def Ĭ��ֵ�������Ļ�Ĭ��ֵΪnull
     * @returns ���ػ���ֵ�����������Ч�ڣ��򷵻�null�����û��Զ����Ĭ��ֵ
     */
    getItem(key: string, def: any = null) {
        let item = this.storage.getItem(getKey(key, this.prefix, this.suffix));
        if (item) {
            try {
                if (this.encryption) {
                    // ����Ǽ��ܹ����ַ������Ƚ���
                    item = handleDecryptData(this.encryptionKey, item) || ''
                }
                const data = JSON.parse(item as string);
                const { value, expires } = data;
                // ����Ч���ڷ���
                if (expires) {
                    if (expires >= Date.now()) {
                        return value;
                    } else {
                        // �����������ʱ���ˣ���ɾ����ǰ��ֵ
                        this.removeItem(key);
                    }

                } else {
                    return data
                }

            } catch (e) {
                // ��item�ò�����ֵ�Ե�ʱ��֤�������쳣������Ĭ��ֵ
                return def
            }
        }
        return def
    }

    /**
     * @description �ӻ���ɾ��ĳ��
     * @param {string}  key  �����
     */
    removeItem(key: string) {
        this.storage.removeItem(getKey(key, this.prefix, this.suffix));
    }

    /**
     * @description ������л���
     */
    clear() {
        this.storage.clear();
    }


}



export default CreateStorage