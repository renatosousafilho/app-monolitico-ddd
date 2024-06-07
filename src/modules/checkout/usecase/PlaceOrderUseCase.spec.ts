import ClientAdminFacadeInterface, { AddClientAdminFacadeInput, FindClientAdminFacadeInput, FindClientAdminFacadeOutput } from '../../client-adm/facade/ClientAdminFacadeInterface';
import PlaceOrderUseCase from './PlaceOrderUseCase';

describe('PlaceOrderUseCase', () => {
  it('shoult throw error if client does not exist', async () => {
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
});
