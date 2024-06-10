import ProductAdminFacade from './ProductAdminFacade';
import AddProductUseCase from '../usecase/AddProductUseCase';
import CheckStockProductUseCase from '../usecase/CheckStockProductUseCase';
import ProductGateway from '../gateway/product.gateway';
import Product from '../entity/product.entity';
import Id from '../../@shared/domain/value-object/id.value-object';

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

describe('ProductRepositoryAdminFacade', () => {
  it('should create a product', async () => {
    const productRepository = new MockProductGateway();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockProductUseCase = new CheckStockProductUseCase(productRepository);
    const productFacade = new ProductAdminFacade(addProductUseCase, checkStockProductUseCase);

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 10,
      stock: 10,
    };
    

    const output =  await productFacade.addProduct(input);

    expect(output).not.toBeNull();
    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);
  });

  it('should check stock of a product', async () => {
    // Arrange
    const productRepository = new MockProductGateway();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockProductUseCase = new CheckStockProductUseCase(productRepository);
    const productFacade = new ProductAdminFacade(addProductUseCase, checkStockProductUseCase);

    // Act
    const input = { productId: '1' };
    const output = await productFacade.checkStockProduct(input);

    // Assert
    expect(output.productId).toBe(input.productId);
    expect(output.stock).toBe(10);
  });
});