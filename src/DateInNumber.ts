interface DateInNumberInterface {
  _date: Date;
}

export default class DateInNumber implements DateInNumberInterface {
  _date: Date;

  constructor(date: Date) {
    this._date = isNaN(date.valueOf()) ? new Date() : date;
  }

  get year() {
    return this._date.getFullYear();
  }

  set year(value) {
    this._date.setFullYear(value);
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
    this._date.setDate(value);
  }
}
