import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from './OrderModel';

@Table({
  tableName: 'order_item',
  timestamps: false
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false, field: 'product_name' })
  productName: string

  @Column({ allowNull: false, field: 'product_description' })
  productDescription: string

  @Column({ allowNull: false, field: 'product_sales_price' })
  productSalesPrice: number

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false, field: 'order_id' })
  orderId: string
}