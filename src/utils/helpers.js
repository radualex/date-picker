import moment from "moment";

export function getDates(month, year, gridSize) {
  const gridSizePlusOne = gridSize + 1;
  let daysOfCurrentMonth = getDaysOfMonth(month, year);
  const firstDay = daysOfCurrentMonth[0].momentDate;
  let currentMonthAndPreviousDaysArray = getDaysBefore(firstDay).concat(
    daysOfCurrentMonth
  );
  const lastDay =
    currentMonthAndPreviousDaysArray[
      currentMonthAndPreviousDaysArray.length - 1
    ].momentDate;
  const restOfDaysAfter =
    gridSizePlusOne - currentMonthAndPreviousDaysArray.length;
  let finalArr = currentMonthAndPreviousDaysArray.concat(
    getDaysAfterFrom(lastDay, restOfDaysAfter)
  );
  return finalArr;
}

export function setActiveDate(date, dateArr, status) {
  const index = getIndexOfDate(date, dateArr);
  dateArr[index].active = status;
}

export function setActiveDateForRange(start, end, dateArr, status) {
  for (let index = start; index <= end; index++) {
    dateArr[index].active = status;
  }
}

export function getIndexOfDate(date, dateArr) {
  return dateArr.findIndex(
    (d) =>
      d.day === date.day &&
      d.dayOfWeek === date.dayOfWeek &&
      d.month === date.month &&
      d.year === date.year
  );
}

// export function getFirstAndLastItems(dateArr) {
//   const activeDates = dateArr.filter((d) => d.active);
//   if (activeDates.length === 1) {
//     return [activeDates[0]];
//   } else {
//     const lastIndex = activeDates.length - 1;
//     return [activeDates[0], activeDates[lastIndex]];
//   }
// }

export function resetActiveAllDates(dateArr) {
  for (let index = 0; index < dateArr.length; index++) {
    dateArr[index].active = false;
  }
}

function getDaysOfMonth(month, year) {
  var ar = [];
  var start = moment(`${year}-${month}`);
  for (
    var end = moment(start).add(1, "month");
    start.isBefore(end);
    start.add(1, "day")
  ) {
    // TODO: extract model
    ar.push({
      day: start.date(),
      dayOfWeek: start.day(),
      month: start.month() + 1,
      year: start.year(),
      active: false,
      momentDate: moment(start)
    });
  }
  return ar;
}

function getDaysBefore(momentDate) {
  var ar = [];
  const currentDayOfWeek = momentDate.day();
  if (currentDayOfWeek !== 0) {
    for (
      var start = moment(momentDate).subtract(currentDayOfWeek, "days");
      start.isBefore(momentDate);
      start.add(1, "day")
    ) {
      ar.push({
        day: start.date(),
        dayOfWeek: start.day(),
        month: start.month() + 1,
        year: start.year(),
        active: false,
        momentDate: moment(start)
      });
    }
  }
  return ar;
}

function getDaysAfterFrom(momentDate, howMany) {
  var ar = [];
  var start = moment(momentDate).add(1, "day");
  for (
    var end = moment(momentDate).add(howMany, "days");
    start.isBefore(end);
    start.add(1, "day")
  ) {
    ar.push({
      day: start.date(),
      dayOfWeek: start.day(),
      month: start.month() + 1,
      year: start.year(),
      active: false,
      momentDate: moment(start)
    });
  }
  return ar;
}
