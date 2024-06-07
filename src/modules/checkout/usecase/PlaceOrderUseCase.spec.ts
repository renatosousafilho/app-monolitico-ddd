import ClientAdminFacadeInterface, { AddClientAdminFacadeInput, FindClientAdminFacadeInput, FindClientAdminFacadeOutput } from '../../client-adm/facade/ClientAdminFacadeInterface';
import ProductAdminFacadeInterface, { AddProductAdminFacadeInputDTO, CheckStockProductAdminFacadeInputDTO, CheckStockProductAdminFacadeOutputDTO } from '../../product-adm/facade/ProductAdminFacadeInterface';
import PlaceOrderUseCase from './PlaceOrderUseCase';

class ClientAdminFacadeMockWithClientNotFound implements ClientAdminFacadeInterface {
  add(client: AddClientAdminFacadeInput): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(input: FindClientAdminFacadeInput): Promise<FindClientAdminFacadeOutput> {
    return Promise.resolve(null);
  }
}

class ClientAdminFacadeMockWithClientFound implements ClientAdminFacadeInterface {
  add(client: AddClientAdminFacadeInput): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async find(input: FindClientAdminFacadeInput): Promise<FindClientAdminFacadeOutput> {
    return {
      id: 'client-id',
      name: 'Client',
      email: 'x@x.com',
      document: '123',
      address: 'Address'
    };
  }
}

class ProductAdminFacadeCheckStockProductNotFound implements ProductAdminFacadeInterface {
  async checkStockProduct(input: CheckStockProductAdminFacadeInputDTO): Promise<CheckStockProductAdminFacadeOutputDTO> {
    return null;
  }
  addProduct(product: AddProductAdminFacadeInputDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

class ProductAdminFacadeCheckStockProductOutOfStock implements ProductAdminFacadeInterface {
  async checkStockProduct(input: CheckStockProductAdminFacadeInputDTO): Promise<CheckStockProductAdminFacadeOutputDTO> {
    return {
      productId: 'product-id',
      stock: 0
    };
  }
  addProduct(product: AddProductAdminFacadeInputDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('PlaceOrderUseCase', () => {
  it('should throw error if client does not exist', async () => {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientNotFound();
    const placeOrderUseCase = new PlaceOrderUseCase({clientAdminFacade});
    const input = {
      clientId: 'client-id',
      products: [
        { productId: 'product-id' }
      ]
    };

    // Act & Assert
    await expect(placeOrderUseCase.execute(input)).rejects.toThrow('Client not found');
  });

  it('should throw error if products are empty', async () => {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientFound();
    const placeOrderUseCase = new PlaceOrderUseCase({clientAdminFacade});
    const input = {
      clientId: 'client-id',
      products: new Array<{ productId: string }>()
    };

    // Act & Assert
    await expect(placeOrderUseCase.execute(input)).rejects.toThrow('Products are required');
  });

  it('should throw error if product does not exist', async () => {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientFound();
    const productAdminFacade = new ProductAdminFacadeCheckStockProductNotFound();

    const placeOrderUseCase = new PlaceOrderUseCase({ clientAdminFacade, productAdminFacade });
    const input = {
      clientId: 'client-id',
      products: [
        { productId: 'product-not-found' }
      ]
    };

    // Act & Assert
    await expect(placeOrderUseCase.execute(input)).rejects.toThrow('Product not found');
  });

  it('should throw error if product is out of stock', async () => {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientFound();
    const productAdminFacade = new ProductAdminFacadeCheckStockProductOutOfStock();

    const placeOrderUseCase = new PlaceOrderUseCase({ clientAdminFacade, productAdminFacade });
    const input = {
      clientId: 'client-id',
      products: [
        { productId: 'product-not-found' }
      ]
    };

    // Act & Assert
    await expect(placeOrderUseCase.execute(input)).rejects.toThrow('Product out of stock');
  });
});
