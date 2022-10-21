export interface IDateProvider {
  getTodayDate(): Date;
  getNext30Day(): Date;
}