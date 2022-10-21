import { IDateProvider } from "../IDateProvider";

import { DateTime } from 'luxon';

class LuxonDateProvider implements IDateProvider {

  getNext30Day(): Date {
    return DateTime.now().plus({ days: 30 }).toJSDate();
  }
  
  getTodayDate(): Date {
    return DateTime.now().toJSDate();
  }
}

export { LuxonDateProvider };