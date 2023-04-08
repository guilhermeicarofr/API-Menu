import jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
import { IAdmin } from 'model/IAdmin';


export class EncryptionService {
  private SECRET;

  constructor() {
    this.SECRET = 'top_secret';
  }

  generateHash(password: string) {
    const passwordHash = bcypt.hashSync(password, 10);
    return { passwordHash };
  }

  compareHash(password: string, hash: string) {
    return (bcypt.compareSync(password, hash)? true : false);
  }

  generateToken(userInfo: IAdmin) {
    const token = jwt.sign(userInfo, this.SECRET);
    return { token };
  }

  verifyToken(token: string) {
    const verified = jwt.verify(token, this.SECRET) as IAdmin;
    return verified;
  }
}