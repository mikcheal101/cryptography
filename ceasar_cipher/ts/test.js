"use strict";
exports.__esModule = true;
var CeasarCipher_1 = require("./CeasarCipher");
var enc = new CeasarCipher_1.CeasarCipher;
var key = 3;
var plaintext = "me1et me after the toga party";
var ciphertext;
enc.encrypt(key, plaintext);
ciphertext = enc.getCipherText();
console.log("key: " + key);
console.log("plaintext: " + plaintext);
console.log("ciphertext: " + ciphertext);
