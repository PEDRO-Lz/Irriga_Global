import { v4 as uuidv4 } from 'uuid';

export class Pivot {
  constructor({ description, flowRate, minApplicationDepth, userId, updatedAt }) {
    this.id = uuidv4();
    this.description = description;
    this.flowRate = flowRate;
    this.minApplicationDepth = minApplicationDepth;
    this.userId = userId;
    this.updatedAt = updatedAt;
  }
}