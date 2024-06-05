import Id from '../../../@shared/domain/value-object/id.value-object';
import Product from '../entity/Product';
import ProductGateway from '../gateway/ProductGateway';
import FindProductByIdUseCase from './FindProductByIdUseCase';

class ProductRepositoryMock implements ProductGateway {
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Product> {
    return new Product(new Id('1'), 'Product 1', 'Description 1', 10);
  }
  
}

describe('FindProductByIdUseCase', () => {
  it('should return a product', async () => {
    // Arrange
    const productRepository = new ProductRepositoryMock();
    const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
    const input = { productId: '1' };
    productRepository.findById = jest.fn().mockResolvedValue(new Product(new Id('1'), 'Product 1', 'Description 1', 10));
    
    // Act
    const response = await findProductByIdUseCase.execute(input);

    // Assert
    expect(productRepository.findById).toHaveBeenCalledTimes(1);
    expect(response.id).toBe('1');
    expect(response.name).toBe('Product 1');
    expect(response.description).toBe('Description 1');
    expect(response.salesPrice).toBe(10);
  });
});