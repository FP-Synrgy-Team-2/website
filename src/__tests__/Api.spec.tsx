import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Api } from '@/api/api';

describe('Api class', () => {
  let mock: MockAdapter;
  let api: Api;
  let setToken: jest.Mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    setToken = jest.fn();

    api = new Api('http://test.com', 'test-token', setToken);
  });

  afterEach(() => {
    mock.reset();
  });

  test('make a GET request', async () => {
    const endpoint = '/test-endpoint';
    const responseData = { data: 'test data' };

    mock.onGet(endpoint).reply(200, responseData);

    const response = await api.get(endpoint);
    expect(response.data).toEqual(responseData);
  });

  test('retry request on 500 status', async () => {
    const endpoint = '/test-endpoint';
    const responseData = { data: 'test data' };

    mock
      .onGet(endpoint)
      .replyOnce(500)
      .onGet(endpoint)
      .reply(200, responseData);

    const response = await api.get(endpoint);
    expect(response.data).toEqual(responseData);
  });

  test('should handle errors', async () => {
    const endpoint = '/test-endpoint';

    mock.onGet(endpoint).replyOnce(500);

    await expect(api.get(endpoint)).rejects.toThrow();
  });
});
