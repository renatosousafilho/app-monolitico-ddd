import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/entity/base.entity';
import Id from '../../@shared/value-object/id.value-object';
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

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItem[];

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItem[] {
    return this._items;
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}