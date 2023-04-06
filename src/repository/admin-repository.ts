import { Database } from 'database/database';
import { IAdmin } from 'model/IAdmin';

export class AdminRepository {
  private db = new Database();

  constructor() {
    this.db.connect();
  }

  async findByUsername(username: string) {
    const user = await this.db.Admin.findOne({ username: username });
    return user;
  }

  async create(admin: IAdmin) {
    const newAdmin = new this.db.Admin(admin);
    await newAdmin.save();
  }
}
