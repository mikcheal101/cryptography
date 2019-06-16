"use strict";
exports.__esModule = true;
var HillCipher_1 = require("./HillCipher");
var hillCipher = new HillCipher_1.HillCipher;
var key = "back up";
var plaintext = "retreat now";
hillCipher.encrypt(key, plaintext);
console.log("\nKey: " + key + "\n\nPlaintext: " + plaintext + "\n\nCiphertext: " + hillCipher.getCipherText() + "\n\n");
//APADJ TFTWLFJ
