import { cryptoConstants } from '../config/constants';
import * as CryptoJS from 'crypto-js';

export const strSlug = (string: string) => {
  return string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[-]+/g, '-')
    .replace(/[^\w-]+/g, '');
  return string;
};

export const encrypt = (string: string): string => {
  const key = CryptoJS.enc.Utf8.parse(cryptoConstants.secret);
  const iv = CryptoJS.enc.Utf8.parse(cryptoConstants.iv);
  const ciphertext = CryptoJS.AES.encrypt(string, key, { iv: iv }).toString();
  return ciphertext;
};

export const decrypt = (string: string): any => {
  const key = CryptoJS.enc.Utf8.parse(cryptoConstants.secret);
  const iv = CryptoJS.enc.Utf8.parse(cryptoConstants.iv);
  const bytes = CryptoJS.AES.decrypt(string, key, { iv: iv });
  const base64Token = bytes.toString(CryptoJS.enc.Utf8);
  return base64Token;
};
