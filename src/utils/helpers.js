import moment from "moment";

export function getDates(
  month,
  year,
  gridSize,
  firstSelectedDate,
  secondSelectedDate
) {
  const gridSizePlusOne = gridSize + 1;
  let finalArr = getDaysOfMonth(month, year);
  const firstDay = finalArr[0].momentDate;
  finalArr = [...getDaysBefore(firstDay), ...finalArr];
  const lastDay = finalArr[finalArr.length - 1].momentDate;
  const restOfDaysAfter = gridSizePlusOne - finalArr.length;
  finalArr = [...finalArr, ...getDaysAfterFrom(lastDay, restOfDaysAfter)];

  setActiveForDates(firstSelectedDate, secondSelectedDate, finalArr);
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

function setActiveForDates(firstSelectedDate, secondSelectedDate, finalArr) {
  const bothAreNull = firstSelectedDate !== null && secondSelectedDate !== null;
  const onlySecondSelectedDateIsNull =
    firstSelectedDate !== null && secondSelectedDate === null;
  if (bothAreNull) {
    setActiveForAllDatesWithinRange(
      firstSelectedDate,
      secondSelectedDate,
      finalArr
    );
  } else if (onlySecondSelectedDateIsNull) {
    setActiveForFirstSelectedDate(firstSelectedDate, finalArr);
  }
}

function setActiveForAllDatesWithinRange(
  firstSelectedDate,
  secondSelectedDate,
  finalArr
) {
  for (let index = 0; index < finalArr.length; index++) {
    const currentMomentDate = moment(finalArr[index].momentDate);
    if (
      currentMomentDate.isSameOrAfter(firstSelectedDate.momentDate) &&
      currentMomentDate.isSameOrBefore(secondSelectedDate.momentDate)
    ) {
      finalArr[index].active = true;
    }
  }
}

function setActiveForFirstSelectedDate(firstSelectedDate, finalArr) {
  const index = getIndexOfDate(firstSelectedDate, finalArr);
  if (index !== -1) {
    finalArr[index].active = true;
  }
}
