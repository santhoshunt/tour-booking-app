export class Booking {
  constructor(
    public id: string,
    public placeId: string,
    public userId: string,
    public placeTitle: string,
    public guestNumber: number,
    public firstName: string,
    public lastName: string,
    public bookedFrom: Date,
    public bookedTo: Date,
    public imageUrl: string
  ) {}
}
