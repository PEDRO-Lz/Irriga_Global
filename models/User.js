import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor({ name, userName, passwordHash }) {
    this.id = uuidv4();
    this.userName = userName;
    this.name = name;
    this.passwordHash = passwordHash;
    this.createdAt = new Date().toISOString();
  }
}