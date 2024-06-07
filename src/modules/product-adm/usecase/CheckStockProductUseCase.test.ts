import Product from '../entity/product.entity';
import ProductGateway from '../gateway/product.gateway';
import Id from '../../@shared/domain/value-object/id.value-object';
import AddProductUseCase from './AddProductUseCase';
import CheckStockProductUseCase from './CheckStockProductUseCase';

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  purchasePrice: 10,
  stock: 10,
});

class MockProductGateway implements ProductGateway {
  async add(product: Product): Promise<void> {}

  async find(id: string): Promise<Product> {
    return product;
  }
}

describe('CheckStockProductUseCase', () => {
  it('should get stock of a product', async () => {
    // Arrange
    const productGateway = new MockProductGateway();
    productGateway.find = jest.fn().mockResolvedValue(product);
    const addProductUseCase = new CheckStockProductUseCase(productGateway);
    const input = {
      productId: '1',
    };
    
    // Act
    const output = await addProductUseCase.execute(input);

    // Assert
    expect(productGateway.find).toBeCalled();
    expect(output.productId).toBe('1');
    expect(output.stock).toBe(10);
  });

});