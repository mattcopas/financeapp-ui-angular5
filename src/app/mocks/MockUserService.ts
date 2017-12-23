import { User } from '../models/User';

export class MockUserService {

    user: User = new User("test@test.com", "token12345", true);

    login(username: string, password: string) {};

    processSuccessfulLogin(usermame: string, accessToken: string) {};

    checkUserIsAuthenticated() {}

    processLogout() {}
}
