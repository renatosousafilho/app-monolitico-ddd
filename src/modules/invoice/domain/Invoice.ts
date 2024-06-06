import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceItem from './InvoiceItem';
import Address from './value-object/Address';

type InvoiceProps = {
  id?: Id // criado automaticamente
  name: string
  document: string
  address: Address // value object
  items: InvoiceItem[] // array de value objects
  createdAt?: Date // criada automaticamente
  updatedAt?: Date // criada automaticamente
};

export default class Invoice {
  private id: Id;
  private name: string;
  private document: string;
  private address: Address;
  private items: InvoiceItem[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: InvoiceProps) {
    this.id = props.id || new Id();
    this.name = props.name;
    this.document = props.document;
    this.address = props.address;
    this.items = props.items;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId(): Id {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDocument(): string {
    return this.document;
  }

  getAddress(): Address {
    return this.address;
  }

  getItems(): InvoiceItem[] {
    return this.items;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
  }
}