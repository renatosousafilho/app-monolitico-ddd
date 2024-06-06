type InvoiceItemProps = {
  id: string;
  name: string;
  price: number;
}

export default class InvoiceItem {
  private id: string;
  private name: string;
  private price: number;

  constructor(props: InvoiceItemProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}