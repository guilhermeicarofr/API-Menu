import { Errors } from 'errors/errors';
import { AdminRepository } from 'repository/admin-repository';
import { EncryptionService } from './encryption-service';

export class AuthService {
  private repository;
  private errors;
  private encryption;

  constructor() {
    this.repository = new AdminRepository();
    this.errors = new Errors();
    this.encryption = new EncryptionService();
  }

  async checkUsernameInUse(username: string) {
    const admin = await this.repository.findByUsername(username);
    return ((admin)? true : false);
  }

  async createNewAdmin(username: string, password: string) {
    if(await this.checkUsernameInUse(username)) throw this.errors.signUp();
  
    const { passwordHash } = this.encryption.generateHash(password);
  
    await this.repository.create({ username, password: passwordHash });
  }

  async returnAdminAuthToken(username: string, password: string) {
    if(!await this.checkUsernameInUse(username)) throw this.errors.userNotFound();

    const admin = await this.repository.findByUsername(username);
    if(!this.encryption.compareHash(password, admin.password)) throw this.errors.login();

    const { token } = this.encryption.generateToken({ username, password });
    return token;
  }
}
