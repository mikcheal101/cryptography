"use strict";
exports.__esModule = true;
var CeasarCipher = /** @class */ (function () {
    function CeasarCipher() {
        this.key = 3; // key default 3
        this.MOD = 26;
        this.matcher = /^[a-z]+$/;
        this.characters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        ];
    }
    CeasarCipher.prototype.encrypt = function (key, plainText) {
        if (key === void 0) { key = 3; }
        this.plaintext = plainText.toLowerCase();
        var cipher = [];
        if (!this.plaintext.match(this.matcher))
            throw new Error('Only alphabets are allowed!');
        for (var i = 0; i < this.plaintext.length; i++) {
            var char = this.plaintext[i];
            var type = parseInt(char);
            if (char !== ' ') {
                var index = this.characters.indexOf(char);
                var cipherIndex = (index + key) % this.MOD;
                cipher.push(this.characters[cipherIndex]);
            }
            else {
                cipher.push(char);
            }
        }
        this.ciphertext = cipher.join('');
    };
    CeasarCipher.prototype.decrypt = function (key, cipherText) {
        if (key === void 0) { key = 3; }
        this.ciphertext = cipherText.toLowerCase();
        var text = [];
        if (!this.plaintext.match(this.matcher))
            throw new Error('Only alphabets are allowed!');
        for (var i = 0; i < this.ciphertext.length; i++) {
            var char = this.ciphertext[i];
            var type = parseInt(char);
            if (char !== ' ') {
                var index = this.characters.indexOf(char);
                var textIndex = (index + key) % this.MOD;
                text.push(this.characters[textIndex]);
            }
            else {
                text.push(char);
            }
        }
        this.ciphertext = text.join('');
    };
    CeasarCipher.prototype.getCipherText = function () {
        return this.ciphertext;
    };
    CeasarCipher.prototype.getPlainText = function () {
        return this.plaintext;
    };
    return CeasarCipher;
}());
exports.CeasarCipher = CeasarCipher;
