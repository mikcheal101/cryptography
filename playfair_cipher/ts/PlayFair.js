"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatrixLocation_1 = require("./MatrixLocation");
var MATCHER = /^[a-z ]+$/;
var PAIR = /.{1,2}/g;
var MATRIX_WIDTH = 5;
var MATRIX_HEIGHT = 5;
var PlayFair = /** @class */ (function () {
    function PlayFair() {
        this.plaintext = "";
        this.cipherText = "";
        this.characters = new Set([
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        ]);
        this.key = new Set();
        this.matrix = new Array();
    }
    /**
    method to encrypt a plain text
    @param key: string
    @param plaintext: string
     */
    PlayFair.prototype.encrypt = function (key, plaintext) {
        var _this = this;
        var tmpkey = new Set(key.toLowerCase());
        this.key = new Set(key.toLowerCase());
        this.plaintext = plaintext.toLowerCase(); // change all plaintext characters to lowercase
        var matrix = tmpkey;
        this.characters.forEach(matrix.add, tmpkey);
        matrix.forEach(function (item) { return _this.matrix.push(item); });
        //console.log(this.plaintext);
        //return;
        // confirm that all characters are alphabets
        if (!this.plaintext.match(MATCHER))
            throw new Error('Only alphabets are allowed!');
        // replace all the letter j with letter i
        var splitted = plaintext.toLowerCase().split('j').join('i').match(PAIR);
        if (splitted[splitted.length - 1].trim().length == 1) // append a space to the last character if it is single
            splitted[splitted.length - 1] += " ";
        var noDuplicates = "";
        splitted.forEach(function (pair) {
            if (pair[0] === pair[1]) {
                noDuplicates += pair[0] + "i" + pair[1];
            }
            else {
                noDuplicates += pair;
            }
        });
        splitted = noDuplicates.match(PAIR);
        if (splitted[splitted.length - 1].trim().length == 1) // append a space to the last character if it is single
            splitted[splitted.length - 1] += " ";
        splitted.forEach(function (pair) {
            if (pair !== undefined && pair[0] !== undefined && pair[1] !== undefined) { // takeout trailing blanks
                if (pair[0] == " " || pair[1] == " ") {
                    _this.cipherText += "" + pair[0] + pair[1];
                }
                else {
                    var firstChar = _this.getLocation(pair[0]);
                    var secondChar = _this.getLocation(pair[1]);
                    if (firstChar.row === secondChar.row) {
                        // same row -> rule 2
                        _this.cipherText += "" + _this.rule2(firstChar, secondChar);
                    }
                    else if (firstChar.column === secondChar.column) {
                        // same column -> rule 3
                        _this.cipherText += "" + _this.rule3(firstChar, secondChar);
                    }
                    else {
                        // different column and row -> rule 4
                        _this.cipherText += "" + _this.rule4(firstChar, secondChar);
                    }
                }
            }
        });
    };
    PlayFair.prototype.getKey = function () {
        var key = "";
        this.key.forEach(function (item) { return key += item; });
        return key;
    };
    PlayFair.prototype.getPlainText = function () {
        return this.plaintext;
    };
    PlayFair.prototype.getCipherText = function () {
        return this.cipherText;
    };
    PlayFair.prototype.rule2 = function (x, y) {
        var i = new MatrixLocation_1.MatrixLocation;
        var j = new MatrixLocation_1.MatrixLocation;
        i.row = x.row;
        i.column = (x.column + 1) % MATRIX_HEIGHT;
        j.row = y.row;
        j.column = (y.column + 1) % MATRIX_HEIGHT;
        return "" + this.getAlphabet(i) + this.getAlphabet(j);
    };
    PlayFair.prototype.rule3 = function (x, y) {
        var i = new MatrixLocation_1.MatrixLocation;
        var j = new MatrixLocation_1.MatrixLocation;
        i.row = (x.row + 1) % MATRIX_WIDTH;
        i.column = x.column;
        j.row = (y.row + 1) % MATRIX_WIDTH;
        j.column = y.column;
        return "" + this.getAlphabet(i) + this.getAlphabet(j);
    };
    PlayFair.prototype.rule4 = function (x, y) {
        var i = new MatrixLocation_1.MatrixLocation;
        var j = new MatrixLocation_1.MatrixLocation;
        i.row = x.row;
        i.column = y.column;
        j.row = y.row;
        j.column = x.column;
        return "" + this.getAlphabet(i) + this.getAlphabet(j);
    };
    PlayFair.prototype.getLocation = function (param) {
        var location = new MatrixLocation_1.MatrixLocation();
        var itemSpace = this.matrix.indexOf(param);
        location.row = Math.floor(itemSpace / MATRIX_WIDTH);
        location.column = itemSpace % MATRIX_HEIGHT;
        return location;
    };
    PlayFair.prototype.getAlphabet = function (param) {
        var item = (param.row * MATRIX_WIDTH) + param.column;
        return this.matrix[item];
    };
    return PlayFair;
}());
exports.PlayFair = PlayFair;
