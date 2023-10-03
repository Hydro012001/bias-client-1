import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export function encryptId(id) {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  return encodeURIComponent(encrypted);
}

export function decryptId(encryptedId) {
  try {
    const decrypted = CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedId),
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return parseInt(decrypted, 10);
  } catch (error) {
    console.error("Decryption error:", error.message);
    alert(error);
    return null; // Return null to indicate a decryption error
  }
}
