import ClientAdminFacadeInterface, { AddClientAdminFacadeInput, FindClientAdminFacadeInput, FindClientAdminFacadeOutput } from '../../client-adm/facade/ClientAdminFacadeInterface';
import PlaceOrderUseCase from './PlaceOrderUseCase';

describe('PlaceOrderUseCase', () => {
  it('should throw error if client does not exist', async () => {
    // Arrange
    const cliendAdminFacade = new class implements ClientAdminFacadeInterface {
      add(client: AddClientAdminFacadeInput): Promise<void> {
        throw new Error('Method not implemented.');
      }
      find(input: FindClientAdminFacadeInput): Promise<FindClientAdminFacadeOutput> {
        return Promise.resolve(null);
      }
      
    }
    const placeOrderUseCase = new PlaceOrderUseCase(cliendAdminFacade);
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
    const cliendAdminFacade = new class implements ClientAdminFacadeInterface {
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
    const placeOrderUseCase = new PlaceOrderUseCase(cliendAdminFacade);
    const input = {
      clientId: 'client-id',
      products: new Array<{ productId: string }>()
    };

    // Act & Assert
    await expect(placeOrderUseCase.execute(input)).rejects.toThrow('Products are required');
  });
});
