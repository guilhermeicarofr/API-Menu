import bcypt from 'bcrypt';

export class EncryptionService {
  generateHash(password: string) {
    const passwordHash = bcypt.hashSync(password, 10);
    return { passwordHash };
  }
}
