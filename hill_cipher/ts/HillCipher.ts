const ALPHABETS: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
const MATCHER = /^[a-z ]+$/;
const PAIR = /.{1,2}/g;

export class HillCipher {

  private key: string;
  private keyMatrix: Array<string>;
  private keyLength: number;
  private keyMatrixSize: number;
  private keyMatrixWidth: number;

  private plaintext: string;
  private plaintextMatrix: Array<string>;
  private plaintextLength: number;
  private plaintextMatrixSize: number;
  private plaintextMatrixWidth: number;

  private ciphertext: string;
  private ciphertextMatrix: Array<string>;
  private ciphertextLength: number;
  private ciphertextMatrixSize: number;
  private ciphertextMatrixWidth: number;

  constructor() {
    this.key = "";
    this.keyMatrix = new Array<string>();
    this.keyLength = 0;
    this.keyMatrixSize = 0;
    this.keyMatrixWidth = 0;

    this.plaintext = "";
    this.plaintextMatrix = new Array<string>();
    this.plaintextLength = 0;
    this.plaintextMatrixSize = 0;
    this.plaintextMatrixWidth = 0;

    this.ciphertext = "";
    this.ciphertextMatrix = new Array<string>();
    this.ciphertextLength = 0;
    this.ciphertextMatrixSize = 0;
    this.ciphertextMatrixWidth = 0;
  }

  private prepareKeyMatrix(k: string): void {
    this.key = k.trim().toLowerCase();
    let key_: string = this.key.split(' ').join('');
    this.keyLength = key_.length;
    this.keyMatrixWidth = Math.ceil(Math.sqrt(this.keyLength));
    this.keyMatrixSize = this.keyMatrixWidth * this.keyMatrixWidth;

    for (let i: number = 0; i < (this.keyMatrixSize - this.keyLength); i++) key_ += 'x'; // pad the key with extras

    this.keyMatrix = this.splitString(this.keyMatrixWidth, key_);
  }

  private preparePlaintextMatrix(p: string) {
    this.plaintext = p.toLowerCase();
    let plaintext_: string = this.plaintext.split(' ').join('');
    this.plaintextLength = plaintext_.length;
    let paddingWidth: number = this.plaintextLength % this.keyMatrixWidth; // eg 3 - (10 mod 3) = 2
    let plaintextMatrix_: string = plaintext_;
    for (let i: number = 0; i < paddingWidth; i++) plaintextMatrix_ += 'x';
    this.plaintextMatrixSize = plaintextMatrix_.length / this.keyMatrixWidth;
    this.plaintextMatrix = this.splitString(this.keyMatrixWidth, plaintextMatrix_);
  }

  private splitString(length: number, param: string): Array<string> {
    let result: Array<string> = [];
    let starter: string = "";
    for (var i = 0, c = 1; i < param.length; i++ , c++) {
      starter += param[i];
      if (c % length == 0) {
        result.push(starter);
        starter = "";
      }
    }
    return result;
  }

  private multiplyKeyMatrixWithPlaintextMatrix() {

    this.plaintextMatrix.forEach(column => {
      this.keyMatrix.forEach(x => {
        var row: Array<string> = new Array<string>();
        var keys = x.split('');
        var plains = column.split('');
        var sum: number = 0;

        for (var i = 0; i < this.keyMatrixWidth; i++) {
          sum += ALPHABETS.indexOf(keys[i]) * ALPHABETS.indexOf(plains[i]);
        }
        sum = sum % ALPHABETS.length;
        this.ciphertextMatrix.push(ALPHABETS[sum]);
        this.ciphertext += ALPHABETS[sum];
      });
    });
  }

  private splitCipherText() {
    let startPoisition: number = 0;
    let index: number = this.plaintext.indexOf(' ', startPoisition);
    while (index > -1) {
      this.ciphertext = this.ciphertext.substring(0, index) + ' ' + this.ciphertext.substring(index, this.ciphertext.length + 1);
      startPoisition = index + 1;
      index = this.plaintext.indexOf(' ', startPoisition);
    }
    //this.ciphertext = this.ciphertext.substring(0, this.plaintext.length);
  }

  /**
   * the method to encrypt a text
   * @param k: key
   * @param p: plaintext
   */
  public encrypt(k: string, p: string): void {
    // check for none alphabets
    if (!p.match(MATCHER) || !k.match(MATCHER)) {
      throw new Error('only alphabets are allowed for the key and/or plaintext!');
    } else {
      this.prepareKeyMatrix(k);
      this.preparePlaintextMatrix(p);
      this.multiplyKeyMatrixWithPlaintextMatrix();
      this.splitCipherText();
    }
  }


  public decrypt(): void { }

  public getKey(): string {
    return this.key;
  }

  public getPlaintext(): string {
    return this.plaintext;
  }

  public getCipherText(): string {
    return this.ciphertext;
  }

  public toString(): string {
    return `
      Key: ${this.key}\n
      Plaintext: ${this.plaintext}\n
      Plaintext Matrix: ${this.plaintextMatrix}\n
      Cipher Text: ${this.ciphertext}\n
      Ciphertext Matrix: ${this.ciphertextMatrix}\n`;
  }

}