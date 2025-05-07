import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { PUBLIC_COOKIE_KEY_SECRET } from '$env/static/public';
const encrypt = (data = '') => {
    try {
      const encryptedData = AES.encrypt(data, PUBLIC_COOKIE_KEY_SECRET).toString();
      return encryptedData;
    } catch (error) {
      console.error(error);
      return '';
    }
};

export const decrypted = (data = '') => {
    try {
      const decrypt = AES.decrypt(data, PUBLIC_COOKIE_KEY_SECRET);
      const decryptedData = JSON.parse(decrypt.toString(encUtf8));
      return decryptedData;
    } catch (error) {
      console.error(error);
      return '';
    }
};

  export const setCookie = (key: string, value: object | string | number) => {
    const jsonString = JSON.stringify(value);
    const encrypted = encrypt(jsonString) || '';
    const updatedCookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      encrypted,
    )};`;
    document.cookie = updatedCookie;
  };

const getCookieWithKey = (name: string) => {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  export const getCookie = (key: string) => {
    const oldValue = getCookieWithKey(key);
    if (oldValue) {
      const decryptedData = decrypted(oldValue);
      // if (key) {
      //   return decryptedData?.[key];
      // }
      return decryptedData;
    }
    return undefined;
  };

export const deleteCookie = (name: string) => {
    document.cookie = `${encodeURIComponent(name)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
