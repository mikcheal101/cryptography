import { CeasarCipher } from './CeasarCipher';
var enc = new CeasarCipher;

var key: number = 3;
var plaintext: string = "me1et me after the toga party";
var ciphertext: string;

enc.encrypt(key, plaintext);
ciphertext = enc.getCipherText();

console.log("key: " + key);
console.log("plaintext: " + plaintext);
console.log("ciphertext: " + ciphertext);