import { Database } from 'database/database';
import { IAdmin } from 'model/IAdmin';

export class AdminRepository {
  private db;

  constructor() {
    this.db = Database.getInstance();
    this.db.connect();
  }

  async findByUsername(username: string): Promise<IAdmin> {
    const user = await this.db.Admin.findOne({ username: username });
    return user;
  }

  async create(admin: IAdmin) {
    const newAdmin = new this.db.Admin(admin);
    await newAdmin.save();
  }
}
