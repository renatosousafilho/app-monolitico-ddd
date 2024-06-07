import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Client from './Client';
import Product from './Product';

type OrderProps = {
  id?: Id;
  client: Client;
  products: Product[];
  status?: string;
}

export default class Order extends BaseEntity implements AggregateRoot {
  private _client: Client;
  private _products: Product[];
  private _status: string;

  constructor(props: OrderProps) {
    super(props.id);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status;
  }

  approve() {
    this._status = 'approved';
  }

  decline() {
    this._status = 'declined';
  }

  get client() {
    return this._client;
  }

  get products() {
    return this._products;
  }

  get status() {
    return this._status;
  }


  get total() {
    return this._products.reduce((acc, product) => acc + product.salesPrice, 0);
  }
}