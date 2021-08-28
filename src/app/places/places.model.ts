export class Place {
  constructor(
    public title: string,
    public id: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public fromDate: Date,
    public toDate: Date,
    public userId: string
  ) {}
}
