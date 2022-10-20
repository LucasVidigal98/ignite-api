import { IDateProvider } from "../IDateProvider";

import { DateTime } from 'luxon';

class LuxonDateProvider implements IDateProvider {
  getTodayDate(): Date {
    return DateTime.now().toJSDate();
  }
}

export { LuxonDateProvider };