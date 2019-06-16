export class CeasarCipher {
  protected key: number = 3; // key default 3
  protected plaintext: string;
  protected ciphertext: string;
  protected characters: Array<string>;
  protected MOD: number = 26;
  protected matcher = /^[a-z]+$/;

  constructor() {
    this.characters = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ];
  }


  encrypt(key: number = 3, plainText: string) {
    this.plaintext = plainText.toLowerCase();
    let cipher: Array<string> = [];

    if (!this.plaintext.match(this.matcher))
      throw new Error('Only alphabets are allowed!');

    for (let i = 0; i < this.plaintext.length; i++) {
      let char: string = this.plaintext[i];
      let type: number = parseInt(char);


      if (char !== ' ') {
        let index: number = this.characters.indexOf(char);
        let cipherIndex: number = (index + key) % this.MOD;
        cipher.push(this.characters[cipherIndex]);
      } else {
        cipher.push(char);
      }
    }
    this.ciphertext = cipher.join('');
  }

  decrypt(key: number = 3, cipherText: string) {
    this.ciphertext = cipherText.toLowerCase();
    let text: Array<string> = [];

    if (!this.plaintext.match(this.matcher))
      throw new Error('Only alphabets are allowed!');

    for (let i = 0; i < this.ciphertext.length; i++) {
      let char: string = this.ciphertext[i];
      let type: number = parseInt(char);

      if (char !== ' ') {
        let index: number = this.characters.indexOf(char);
        let textIndex: number = (index + key) % this.MOD;
        text.push(this.characters[textIndex]);
      } else {
        text.push(char);
      }
    }
    this.ciphertext = text.join('');
  }

  getCipherText(): string {
    return this.ciphertext;
  }

  getPlainText(): string {
    return this.plaintext;
  }

}