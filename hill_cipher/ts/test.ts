import { HillCipher } from "./HillCipher";

var hillCipher: HillCipher = new HillCipher;
var key: string = "back up";
var plaintext: string = "retreat now";
hillCipher.encrypt(key, plaintext);
console.log(`
Key: ${key}\n
Plaintext: ${plaintext}\n
Ciphertext: ${hillCipher.getCipherText()}\n
`);

//APADJ TFTWLFJ

