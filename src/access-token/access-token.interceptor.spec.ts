import { AccessTokenInterceptor } from './access-token.interceptor';

describe('AccessTokenInterceptor', () => {
  it('should be defined', () => {
    expect(new AccessTokenInterceptor()).toBeDefined();
  });
});
