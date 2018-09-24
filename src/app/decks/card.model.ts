export class Card {
  public text: string;
  public value: number;
  public icon: string;

  public constructor(text: string, value: number, icon?: string) {
    this.text = text;
    this.value = value;
    this.icon = icon;
  }
}
