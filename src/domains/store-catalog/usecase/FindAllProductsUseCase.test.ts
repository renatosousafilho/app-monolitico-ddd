import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../entity/Product';
import ProductGateway from '../gateway/ProductGateway';
import FindAllProductsUseCase from './FindAllProductsUseCase';

const product1 = new Product(new Id('1'),'Product 1', 'Description 1', 10);
const product2 = new Product(new Id('2'),'Product 2', 'Description 2', 20);

class ProductRepositoryMock implements ProductGateway {
  async findAll() {
    return [product1, product2];
  }

  async findById(id: string) {
    return product1;
  }
}

describe('FindAllProductsUseCase', () => {
  it('should return a list of products', async () => {
    // Arrange
    const productRepository = new ProductRepositoryMock();
    productRepository.findAll = jest.fn().mockResolvedValue([product1, product2]);
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    
    // Act
    const response = await findAllProductsUseCase.execute();

    // Assert
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
    expect(response.products).toHaveLength(2);
    expect(response.products[0].id).toBe('1');
    expect(response.products[0].name).toBe('Product 1');
    expect(response.products[0].description).toBe('Description 1');
    expect(response.products[0].salesPrice).toBe(10);
    expect(response.products[1].id).toBe('2');
    expect(response.products[1].name).toBe('Product 2');
    expect(response.products[1].description).toBe('Description 2');
    expect(response.products[1].salesPrice).toBe(20);
  });
});