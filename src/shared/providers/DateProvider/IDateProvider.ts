export interface IDateProvider {
  getTodayDate(): Date;
  getNext30Day(): Date;
  addHours(sum: number): Date;
  comapareIfBefore(startDate: Date, endDate: Date): boolean;
}