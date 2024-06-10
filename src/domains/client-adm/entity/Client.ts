import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/entity/base.entity';
import Id from '../../@shared/value-object/id.value-object';

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _document: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id);

    this._name = props.name;
    this._email = props.email;
    this._document = props.document;
    this._address = props.address;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }
}