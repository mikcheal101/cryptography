import { MatrixLocation } from "./MatrixLocation";

const MATCHER = /^[a-z ]+$/;
const PAIR = /.{1,2}/g;
const MATRIX_WIDTH = 5;
const MATRIX_HEIGHT = 5;

export class PlayFair {
  private characters: Set<string>;
  private key: Set<string>;
  private matrix: Array<string>;

  private plaintext: string = "";
  private cipherText: string = "";

  public constructor() {
    this.characters = new Set<string>([
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ]);
    this.key = new Set<string>();
    this.matrix = new Array<string>();
  }

  /**
  method to encrypt a plain text
  @param key: string 
  @param plaintext: string
   */
  public encrypt(key: string, plaintext: string) {
    if (!key.match(MATCHER) || !plaintext.match(MATCHER)) {
      new Error('Only alphabets are allowed for the key and/or the plaintext!');
    } else {
      let tmpkey: Set<string> = new Set<string>(key.toLowerCase());
      this.key = new Set<string>(key.toLowerCase());
      this.plaintext = plaintext.toLowerCase(); // change all plaintext characters to lowercase

      let matrix: Set<string> = tmpkey;
      this.characters.forEach(matrix.add, tmpkey);
      matrix.forEach(item => this.matrix.push(item));


      // replace all the letter j with letter i
      let splitted: Array<string> = plaintext.toLowerCase().split('j').join('i').match(PAIR);
      if (splitted[splitted.length - 1].trim().length == 1) // append a space to the last character if it is single
        splitted[splitted.length - 1] += " ";

      let noDuplicates: string = "";
      splitted.forEach(pair => {
        if (pair[0] === pair[1]) {
          noDuplicates += `${pair[0]}i${pair[1]}`;
        }
        else {
          noDuplicates += pair;
        }
      });

      splitted = noDuplicates.match(PAIR);
      if (splitted[splitted.length - 1].trim().length == 1) // append a space to the last character if it is single
        splitted[splitted.length - 1] += " ";

      splitted.forEach(pair => {
        if (pair !== undefined && pair[0] !== undefined && pair[1] !== undefined) { // takeout trailing blanks
          if (pair[0] == " " || pair[1] == " ") {
            this.cipherText += `${pair[0]}${pair[1]}`;
          } else {

            let firstChar: MatrixLocation = this.getLocation(pair[0]);
            let secondChar: MatrixLocation = this.getLocation(pair[1]);

            if (firstChar.row === secondChar.row) {
              // same row -> rule 2
              this.cipherText += `${this.rule2(firstChar, secondChar)}`;
            } else if (firstChar.column === secondChar.column) {
              // same column -> rule 3
              this.cipherText += `${this.rule3(firstChar, secondChar)}`;
            } else {
              // different column and row -> rule 4
              this.cipherText += `${this.rule4(firstChar, secondChar)}`;
            }

          }
        }
      });
    }
  }

  public getKey(): string {
    let key: string = "";
    this.key.forEach(item => key += item);
    return key;
  }

  public getPlainText(): string {
    return this.plaintext;
  }

  public getCipherText(): string {
    return this.cipherText;
  }

  protected rule2(x: MatrixLocation, y: MatrixLocation): string {
    let i: MatrixLocation = new MatrixLocation;
    let j: MatrixLocation = new MatrixLocation;

    i.row = x.row;
    i.column = (x.column + 1) % MATRIX_HEIGHT;

    j.row = y.row;
    j.column = (y.column + 1) % MATRIX_HEIGHT;
    return `${this.getAlphabet(i)}${this.getAlphabet(j)}`;
  }

  protected rule3(x: MatrixLocation, y: MatrixLocation): string {
    let i: MatrixLocation = new MatrixLocation;
    let j: MatrixLocation = new MatrixLocation;

    i.row = (x.row + 1) % MATRIX_WIDTH;
    i.column = x.column;

    j.row = (y.row + 1) % MATRIX_WIDTH;
    j.column = y.column;
    return `${this.getAlphabet(i)}${this.getAlphabet(j)}`;
  }

  protected rule4(x: MatrixLocation, y: MatrixLocation): string {
    let i: MatrixLocation = new MatrixLocation;
    let j: MatrixLocation = new MatrixLocation;

    i.row = x.row;
    i.column = y.column;

    j.row = y.row;
    j.column = x.column;
    return `${this.getAlphabet(i)}${this.getAlphabet(j)}`;
  }

  protected getLocation(param: string): MatrixLocation {
    let location: MatrixLocation = new MatrixLocation();
    var itemSpace: number = this.matrix.indexOf(param);
    location.row = Math.floor(itemSpace / MATRIX_WIDTH);
    location.column = itemSpace % MATRIX_HEIGHT;
    return location;
  }

  protected getAlphabet(param: MatrixLocation): string {
    var item: number = (param.row * MATRIX_WIDTH) + param.column;
    return this.matrix[item];
  }

}