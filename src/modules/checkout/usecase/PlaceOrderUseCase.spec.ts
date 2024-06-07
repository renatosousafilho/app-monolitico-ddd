import ClientAdminFacadeInterface, { AddClientAdminFacadeInput, FindClientAdminFacadeInput, FindClientAdminFacadeOutput } from '../../client-adm/facade/ClientAdminFacadeInterface';
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO } from '../../invoice/facade/InvoiceFacadeInterface';
import PaymentFacadeInterface, { CreatePaymentFacadeInput, CreatePaymentFacadeOutput } from '../../payment/facade/PaymentFacadeInterface';
import ProductAdminFacadeInterface, { AddProductAdminFacadeInputDTO, CheckStockProductAdminFacadeInputDTO, CheckStockProductAdminFacadeOutputDTO } from '../../product-adm/facade/ProductAdminFacadeInterface';
import StoreCatalogFacadeInterface, { FindAllStoreCatalogProductsOutput, FindStoreCatalogProductInput, FindStoreCatalogProductOutput } from '../../store-catalog/facade/StoreCatalogFacadeInterface';
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

class ProductAdminFacadeCheckStockProductFound implements ProductAdminFacadeInterface {
  async checkStockProduct(input: CheckStockProductAdminFacadeInputDTO): Promise<CheckStockProductAdminFacadeOutputDTO> {
    return {
      productId: 'product-id',
      stock: 10
    };
  }
  addProduct(product: AddProductAdminFacadeInputDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

class StoreCatalogFacadeMockProductNotFound implements StoreCatalogFacadeInterface {
  findAll(): Promise<FindAllStoreCatalogProductsOutput> {
    throw new Error('Method not implemented.');
  }
  find(input: FindStoreCatalogProductInput): Promise<FindStoreCatalogProductOutput> {
    return null;
  }
}

class StoreCatalogFacadeMockProductFound implements StoreCatalogFacadeInterface {
  findAll(): Promise<FindAllStoreCatalogProductsOutput> {
    throw new Error('Method not implemented.');
  }
  async find(input: FindStoreCatalogProductInput): Promise<FindStoreCatalogProductOutput> {
    return {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 10,
    };
  }
}

class PaymentFacadeMockDeclined implements PaymentFacadeInterface {
  async process(input: CreatePaymentFacadeInput): Promise<CreatePaymentFacadeOutput> {
    return {
      transactionId: '1',
      orderId: '1',
      amount: 10,
      status: 'declined',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}

class PaymentFacadeMockApproved implements PaymentFacadeInterface {
  async process(input: CreatePaymentFacadeInput): Promise<CreatePaymentFacadeOutput> {
    return {
      transactionId: '1',
      orderId: '1',
      amount: 10,
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}

class InvoiceFacadeMock implements InvoiceFacadeInterface {
  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    throw new Error('Method not implemented.');
  }
  async generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
    return {
      id: '1',
      name: '',
      document: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      zipCode: '',
      items: [{
        id: '',
        name: '',
        price: 10,
      }],
      total: 10,
    } 
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

  it('should throw error if product not exists in store catalog', async () => {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientFound();
    const productAdminFacade = new ProductAdminFacadeCheckStockProductFound();
    const storeCatalogFacade = new StoreCatalogFacadeMockProductNotFound();

    const placeOrderUseCase = new PlaceOrderUseCase({ 
      clientAdminFacade, 
      productAdminFacade,
      storeCatalogFacade,
    });
    const input = {
      clientId: '1',
      products: [
        { productId: 'product-not-found' }
      ]
    };

    // Act & Assert
    await expect(placeOrderUseCase.execute(input)).rejects.toThrow('Product not found in store catalog');
  });

  it('should return an order declined when payment has been declined', async function() {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientFound();
    const productAdminFacade = new ProductAdminFacadeCheckStockProductFound();
    const storeCatalogFacade = new StoreCatalogFacadeMockProductFound();
    const paymentFacade = new PaymentFacadeMockDeclined();

    const placeOrderUseCase = new PlaceOrderUseCase({ 
      clientAdminFacade, 
      productAdminFacade,
      storeCatalogFacade,
      paymentFacade,
    });
    const input = {
      clientId: '1',
      products: [
        { productId: '1' }
      ]
    };

    // Act
    const output = await placeOrderUseCase.execute(input);

    // Assert
    expect(output.id).toBeDefined();
    expect(output.invoiceId).toBeNull();
    expect(output.status).toBe('declined');
    expect(output.total).toBe(10);
    expect(output.products).toStrictEqual(input.products);
  });

  it('should return an order approved when payment has been approved', async function() {
    // Arrange
    const clientAdminFacade = new ClientAdminFacadeMockWithClientFound();
    const productAdminFacade = new ProductAdminFacadeCheckStockProductFound();
    const storeCatalogFacade = new StoreCatalogFacadeMockProductFound();
    const paymentFacade = new PaymentFacadeMockApproved();
    const invoiceFacade = new InvoiceFacadeMock();

    const placeOrderUseCase = new PlaceOrderUseCase({ 
      clientAdminFacade, 
      productAdminFacade,
      storeCatalogFacade,
      paymentFacade,
      invoiceFacade,
    });
    const input = {
      clientId: '1',
      products: [
        { productId: '1' }
      ]
    };

    // Act
    const output = await placeOrderUseCase.execute(input);

    // Assert
    expect(output.id).toBeDefined();
    expect(output.invoiceId).toBe('1');
    expect(output.status).toBe('approved');
    expect(output.total).toBe(10);
    expect(output.products).toStrictEqual(input.products);
  });
});
