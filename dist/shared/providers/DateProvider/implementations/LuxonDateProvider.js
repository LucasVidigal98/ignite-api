"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LuxonDateProvider = void 0;
var _luxon = require("luxon");
class LuxonDateProvider {
  addHours(sum) {
    return _luxon.DateTime.now().plus({
      hours: sum
    }).toJSDate();
  }
  getNext30Day() {
    return _luxon.DateTime.now().plus({
      days: 30
    }).toJSDate();
  }
  getTodayDate() {
    return _luxon.DateTime.now().toUTC().toJSDate();
  }
  comapareIfBefore(startDate, endDate) {
    return _luxon.DateTime.fromJSDate(startDate).millisecond < _luxon.DateTime.fromJSDate(endDate).millisecond;
  }
}
exports.LuxonDateProvider = LuxonDateProvider;