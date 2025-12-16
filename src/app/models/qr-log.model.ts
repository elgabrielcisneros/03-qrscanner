export class QrLog {
  public bytes!: number[];
  public displayValue!: string;
  public format!: string;
  public rawValue!: string;
  public valueType!: string;
  public icon!: string;
  public created!: Date;
  public urlBookmark?: {
    title: string;
    url: string;
  };

  constructor(format: string, rawValue: string) {
    this.format = format;
    this.rawValue = rawValue;

    this.created = new Date();
    this.defineType();
  }

  private defineType() {
    const guessType = this.rawValue.substring(0, 4);
    console.info("guessType", guessType);

    switch (guessType) {
      case "http":
        this.valueType = "url";
        this.icon = "globe";
        break;

      case "tel":
        this.valueType = "tel";
        this.icon = "call";
        break;

      case "geo":
        this.valueType = "geo";
        this.icon = "pin";
        break;

      default:
        this.valueType = "not found";
        this.icon = "barcode";
    }
  }
}
