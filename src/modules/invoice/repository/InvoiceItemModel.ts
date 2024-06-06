import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from './InvoiceModel';

@Table({
  tableName: 'invoice_item',
  timestamps: false
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  price: number

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: number;
}