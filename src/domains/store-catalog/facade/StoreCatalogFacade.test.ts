import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../entity/Product';
import ProductGateway from '../gateway/ProductGateway';
import FindAllProductsUseCase from '../usecase/FindAllProductsUseCase';
import FindProductByIdUseCase from '../usecase/FindProductByIdUseCase';
import StoreCatalogFacade from './StoreCatalogFacade';

class MockProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    return [
      new Product(new Id('1'), 'Product 1', 'Description 1', 100),
      new Product(new Id('2'), 'Product 2', 'Description 2', 200),      
    ]
  }

  async findById(id: string): Promise<Product> {
    return new Product(new Id('1'), 'Product 1', 'Description 1', 100);
  }
}

describe('StoreCatalogFacade', () => {
  it('should find all products', async () => {
    // Arrange
    const productRepository = new MockProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade(findAllProductsUseCase, findProductByIdUseCase);

    // Act
    const products = await storeCatalogFacade.findAll();

    // Assert
    expect(products.products).toHaveLength(2);
    expect(products.products[0].id).toBe('1');
    expect(products.products[0].name).toBe('Product 1');
    expect(products.products[0].description).toBe('Description 1');
    expect(products.products[0].salesPrice).toBe(100);
    expect(products.products[1].id).toBe('2');
    expect(products.products[1].name).toBe('Product 2');
    expect(products.products[1].description).toBe('Description 2');
    expect(products.products[1].salesPrice).toBe(200);
  });

  it('should find one product', async () => {
    // Arrange
    const productRepository = new MockProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade(findAllProductsUseCase, findProductByIdUseCase);
    const input = { id: '1' };

    // Act
    const product = await storeCatalogFacade.find(input);

    // Assert
    expect(product).toBeDefined();
    expect(product.id).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.salesPrice).toBe(100);
  });
});