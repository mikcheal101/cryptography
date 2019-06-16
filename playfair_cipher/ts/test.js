"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayFair_1 = require("./PlayFair");
var test = new PlayFair_1.PlayFair;
var key = 'Mornarchy';
var plaintext = 'Hello dear friend';
test.encrypt(key, plaintext);
var enc = test.getCipherText();
console.log({
    'key': test.getKey(),
    'plain text': test.getPlainText(),
    'cipher text': test.getCipherText()
});
