import { CartService } from './cart.service';
import { Session } from 'express-session';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(() => {
    cartService = new CartService();
  });
  const createMockSession = (sessionId: string): Session => {
    return {
      id: sessionId,
      cookie: {
        originalMaxAge: 1000,
        expires: new Date(),
        httpOnly: true,
        path: '/',
      },
      resetMaxAge: jest.fn(),
      regenerate: jest.fn(),
      destroy: jest.fn(),
      reload: jest.fn(),
      save: jest.fn(),
      touch: jest.fn(),
    };
  };
  describe('add method', () => {
    const mockedSession = createMockSession('session1');
    it('should reject if missing required fields', async () => {
      const data = {
        session: mockedSession.id,
        productId: null,
        quantity: null,
      };
      await expect(cartService.add(data)).rejects.toBe(
        'Missing required fields'
      );
    });

    it('should resolve with "Cart created" for new cart', async () => {
      const data = { session: mockedSession.id, productId: 1, quantity: 1 };
      await expect(
        cartService.add(data).then((r) => {
          return r.message;
        })
      ).resolves.toBe('Cart created');
    });
    it('should resolve with "Item added to cart" for existing cart', async () => {
      const data = { session: mockedSession.id, productId: 1, quantity: 1 };
      await cartService.add(data);
      await expect(cartService.add(data).then((r) => r.message)).resolves.toBe(
        'Item added to cart'
      );
    });
  });
  describe('get method', () => {
    it('should resolve with cart containing items if found', async () => {
      const mockSession = createMockSession('session1');
      await expect(cartService.get(mockSession)).resolves.toEqual({
        items: [{ productId: 1, quantity: 3 }],
        session: 'session1',
      });
    });
    it('should reject if cart not found', async () => {
      const mockSession = createMockSession('nonexistent');
      await expect(cartService.get(mockSession)).rejects.toBe('Empty Cart');
    });
  });
});
