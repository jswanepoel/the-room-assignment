import { CreateUserRequest } from './register-user.request';

describe('CreateUserRequest', () => {
  it('should be defined', () => {
    expect(new CreateUserRequest()).toBeDefined();
  });
});
