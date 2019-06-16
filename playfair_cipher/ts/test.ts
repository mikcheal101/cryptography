import { PlayFair } from "./PlayFair";


var test: PlayFair = new PlayFair;
var key: string = 'Mornarchy';
var plaintext: string = 'Hello dear friend';

test.encrypt(key, plaintext);
var enc: string = test.getCipherText();

console.log({
  'key': test.getKey(),
  'plain text': test.getPlainText(),
  'cipher text': test.getCipherText()
});