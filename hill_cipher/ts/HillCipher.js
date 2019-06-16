"use strict";
exports.__esModule = true;
var ALPHABETS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
var MATCHER = /^[a-z ]+$/;
var PAIR = /.{1,2}/g;
var HillCipher = /** @class */ (function () {
    function HillCipher() {
        this.key = "";
        this.keyMatrix = new Array();
        this.keyLength = 0;
        this.keyMatrixSize = 0;
        this.keyMatrixWidth = 0;
        this.plaintext = "";
        this.plaintextMatrix = new Array();
        this.plaintextLength = 0;
        this.plaintextMatrixSize = 0;
        this.plaintextMatrixWidth = 0;
        this.ciphertext = "";
        this.ciphertextMatrix = new Array();
        this.ciphertextLength = 0;
        this.ciphertextMatrixSize = 0;
        this.ciphertextMatrixWidth = 0;
    }
    HillCipher.prototype.prepareKeyMatrix = function (k) {
        this.key = k.trim().toLowerCase();
        var key_ = this.key.split(' ').join('');
        this.keyLength = key_.length;
        this.keyMatrixWidth = Math.ceil(Math.sqrt(this.keyLength));
        this.keyMatrixSize = this.keyMatrixWidth * this.keyMatrixWidth;
        for (var i = 0; i < (this.keyMatrixSize - this.keyLength); i++)
            key_ += 'x'; // pad the key with extras
        this.keyMatrix = this.splitString(this.keyMatrixWidth, key_);
    };
    HillCipher.prototype.preparePlaintextMatrix = function (p) {
        this.plaintext = p.toLowerCase();
        var plaintext_ = this.plaintext.split(' ').join('');
        this.plaintextLength = plaintext_.length;
        var paddingWidth = this.plaintextLength % this.keyMatrixWidth; // eg 3 - (10 mod 3) = 2
        var plaintextMatrix_ = plaintext_;
        for (var i = 0; i < paddingWidth; i++)
            plaintextMatrix_ += 'x';
        this.plaintextMatrixSize = plaintextMatrix_.length / this.keyMatrixWidth;
        this.plaintextMatrix = this.splitString(this.keyMatrixWidth, plaintextMatrix_);
    };
    HillCipher.prototype.splitString = function (length, param) {
        var result = [];
        var starter = "";
        for (var i = 0, c = 1; i < param.length; i++, c++) {
            starter += param[i];
            if (c % length == 0) {
                result.push(starter);
                starter = "";
            }
        }
        return result;
    };
    HillCipher.prototype.multiplyKeyMatrixWithPlaintextMatrix = function () {
        var _this = this;
        this.plaintextMatrix.forEach(function (column) {
            _this.keyMatrix.forEach(function (x) {
                var row = new Array();
                var keys = x.split('');
                var plains = column.split('');
                var sum = 0;
                for (var i = 0; i < _this.keyMatrixWidth; i++) {
                    sum += ALPHABETS.indexOf(keys[i]) * ALPHABETS.indexOf(plains[i]);
                }
                sum = sum % ALPHABETS.length;
                _this.ciphertextMatrix.push(ALPHABETS[sum]);
                _this.ciphertext += ALPHABETS[sum];
            });
        });
    };
    HillCipher.prototype.splitCipherText = function () {
        var startPoisition = 0;
        var index = this.plaintext.indexOf(' ', startPoisition);
        while (index > -1) {
            this.ciphertext = this.ciphertext.substring(0, index) + ' ' + this.ciphertext.substring(index, this.ciphertext.length + 1);
            startPoisition = index + 1;
            index = this.plaintext.indexOf(' ', startPoisition);
        }
        //this.ciphertext = this.ciphertext.substring(0, this.plaintext.length);
    };
    /**
     * the method to encrypt a text
     * @param k: key
     * @param p: plaintext
     */
    HillCipher.prototype.encrypt = function (k, p) {
        // check for none alphabets
        if (!p.match(MATCHER) || !k.match(MATCHER)) {
            throw new Error('only alphabets are allowed for the key and/or plaintext!');
        }
        else {
            this.prepareKeyMatrix(k);
            this.preparePlaintextMatrix(p);
            this.multiplyKeyMatrixWithPlaintextMatrix();
            this.splitCipherText();
        }
    };
    HillCipher.prototype.decrypt = function () { };
    HillCipher.prototype.getKey = function () {
        return this.key;
    };
    HillCipher.prototype.getPlaintext = function () {
        return this.plaintext;
    };
    HillCipher.prototype.getCipherText = function () {
        return this.ciphertext;
    };
    HillCipher.prototype.toString = function () {
        return "\n      Key: " + this.key + "\n\n      Plaintext: " + this.plaintext + "\n\n      Plaintext Matrix: " + this.plaintextMatrix + "\n\n      Cipher Text: " + this.ciphertext + "\n\n      Ciphertext Matrix: " + this.ciphertextMatrix + "\n";
    };
    return HillCipher;
}());
exports.HillCipher = HillCipher;
