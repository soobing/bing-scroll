
export default class DateInNumber {
  constructor(date) {
    this._date = isNaN(date.valueOf()) ? new Date() : date;
  }

  get year() {
    return this._date.getFullYear();
  }

  set year(value) {
    return this._date.setFullYear(value);
  }

  get month() {
    return this._date.getMonth() + 1;
  }

  set month(value) {
    this._date.setMonth(value - 1);
  }

  get day() {
    return this._date.getDate();
  }

  set day(value) {
    return this._date.setDate(value);
  }
}