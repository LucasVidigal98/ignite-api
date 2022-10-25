import { IDateProvider } from "../IDateProvider";

import { DateTime } from 'luxon';

class LuxonDateProvider implements IDateProvider {
  addHours(sum: number): Date {
    return DateTime.now().plus({ hours: sum }).toJSDate();
  }

  getNext30Day(): Date {
    return DateTime.now().plus({ days: 30 }).toJSDate();
  }
  
  getTodayDate(): Date {
    return DateTime.now().toUTC().toJSDate();
  }

  comapareIfBefore(startDate: Date, endDate: Date): boolean {
    return DateTime.fromJSDate(startDate).millisecond < DateTime.fromJSDate(endDate).millisecond
  }
}

export { LuxonDateProvider };