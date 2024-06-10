import AggregateRoot from '../../@shared/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/entity/base.entity';
import Id from '../../@shared/value-object/id.value-object';

export default class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _salesPrice: number;
  
  constructor(id: Id, name: string, description: string, salesPrice: number) {
    super(id);
    this._name = name;
    this._description = description;
    this._salesPrice = salesPrice;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }
}