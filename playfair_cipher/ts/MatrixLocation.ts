
export class MatrixLocation {
  public row: number = 0;
  public column: number = 0;

  constructor({ r, c }: { r?: number; c?: number; } = {}) {
    this.column = c;
    this.row = r;
  }
}