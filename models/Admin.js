import { v4 as uuidv4 } from 'uuid';

export class Admin {
  constructor({ name, passwordHash }) {
    this.id = uuidv4();
    this.name = name;
    this.passwordHash = passwordHash;
    this.createdAt = new Date().toISOString();
  }
}