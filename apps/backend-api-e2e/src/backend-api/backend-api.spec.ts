import axios from 'axios';

// Create an Axios instance for tests
const axiosInstance = axios.create();

let sessionCookie = '';

// Session establishment test
describe('Session Initialization', () => {
  it('should establish a session', async () => {
    // Assuming the root route (`/`) sets up the session
    const response = await axiosInstance.get('/');

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      sessionCookie = setCookieHeader[0];
      axiosInstance.defaults.headers.Cookie = sessionCookie;
    }

    expect(response.status).toBe(200);
    // Add any other assertions you need to ensure the session is established
  });
});

// Subsequent tests depending on the session
describe('API tests with consistent session', () => {
  it('should create a cart', async () => {
    const res = await axiosInstance.post(`/api/v1/cart`, {
      productId: 1,
      quantity: 1,
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Cart created' });
  });

  it('should get a cart', async () => {
    const res = await axiosInstance.get(`/api/v1/cart`);
    console.log(res);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ items: [{ productId: 1, quantity: 1 }] });
  });
});

// ... any other test cases ...
