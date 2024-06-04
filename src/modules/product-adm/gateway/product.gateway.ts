import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../domain/product.entity';

export default interface ProductGateway {
  find(id: Id): Promise<Product>;
  add(product: Product): Promise<void>;
}