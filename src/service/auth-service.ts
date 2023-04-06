import { Errors } from 'errors/errors';
import { AdminRepository } from 'repository/admin-repository';

export class AuthService {
  private repository;
  private errors;

  constructor() {
    this.repository = new AdminRepository();
    this.errors = new Errors();
  }

  private async checkUsernameInUse(username: string) {
    const admin = await this.repository.findByUsername(username);
    return ((admin)? true : false);
  }

  async createNewAdmin(username: string, password: string) {
    if(await this.checkUsernameInUse(username)) throw this.errors.signUp();
  
    //add bcrypt
  
    await this.repository.create({ username, password });
  }


}