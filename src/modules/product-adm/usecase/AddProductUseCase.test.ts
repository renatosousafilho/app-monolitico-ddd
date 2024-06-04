import Product from '../domain/product.entity';
import ProductGateway from '../gateway/product.gateway';
import Id from '../../@shared/domain/value-object/id.value-object';
import AddProductUseCase from './AddProductUseCase';

class MockProductGateway implements ProductGateway {
  async add(product: Product): Promise<void> {}

  async find(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}

describe('AddProductUseCase', () => {
  it('should add a product', async () => {
    // Arrange
    const productGateway = new MockProductGateway();
    const addProductUseCase = new AddProductUseCase(productGateway);
    const input = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 10,
      stock: 10,
    };
    productGateway.add = jest.fn();
    
    // Act
    const output = await addProductUseCase.execute(input);

    // Assert
    expect(productGateway.add).toBeCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);
  });

});