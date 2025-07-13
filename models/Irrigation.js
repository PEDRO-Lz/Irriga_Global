import { v4 as uuidv4 } from 'uuid';

export class Irrigation {
    constructor({ pivotId, applicationAmount, irrigationDate, userId }) {
        this.id = uuidv4();
        this.pivotId = pivotId;
        this.applicationAmount = applicationAmount;
        this.irrigationDate = irrigationDate;
        this.userId = userId;
    }
}