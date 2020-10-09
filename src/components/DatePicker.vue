<template>
  <div class="container-dp">
    <div class="dp-header">
      <i class="material-icons-outlined" v-on:click="previousMonth()"
        >arrow_back_ios</i
      >
      <span class="dp-month">{{ currentDate.format("MMMM") }}</span>
      <i class="material-icons-outlined" v-on:click="nextMonth()"
        >arrow_forward_ios</i
      >
    </div>
    <hr class="dp-separator" />
    <div class="dp-body" v-if="dates.length !== 0">
      <div v-for="col in columns" :key="`dp-col-${col}`" class="dp-col">
        <span class="dp-day-abrv">{{ daysAbrvMap[col - 1] }}</span>
        <span
          v-for="(date, index) in filteredDatesByDayOfWeek(col - 1)"
          :key="`dp-date-item-${index}`"
          v-bind:class="[
            date.month === currentDate.month()
              ? 'dp-day dp-day-offset-before'
              : 'dp-day',
            date.month === currentDate.month() + 2 ? 'dp-day-offset-after' : '',
            date.active ? 'dp-date-active' : '',
          ]"
          v-on:click="clickDate(date)"
          >{{ date.day }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  getDates,
  setActiveDate,
  setActiveDateForRange,
  getIndexOfDate,
  resetActiveAllDates,
} from "../utils/helpers";

export default {
  name: "DatePicker",
  data() {
    return {
      columns: 7,
      rows: 6,
      daysAbrvMap: ["S", "M", "T", "W", "T", "F", "S"],
      currentDate: moment(),
      dates: [],
      firstSelectedDate: null,
      secondSelectedDate: null,
    };
  },
  methods: {
    filteredDatesByDayOfWeek(day) {
      return this.dates.filter((date) => date.dayOfWeek === day);
    },
    previousMonth: function () {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
      this.dates = getDates(
        this.currentDate.month() + 1,
        this.currentDate.year(),
        this.columns * this.rows,
        this.firstSelectedDate,
        this.secondSelectedDate
      );
    },
    nextMonth: function () {
      this.currentDate = moment(this.currentDate).add(1, "month");
      this.dates = getDates(
        this.currentDate.month() + 1,
        this.currentDate.year(),
        this.columns * this.rows,
        this.firstSelectedDate,
        this.secondSelectedDate
      );
    },
    clickDate: function (date) {
      if (this.firstSelectedDate === null) {
        setActiveDate(date, this.dates, !date.active);
        this.firstSelectedDate = date;
      } else {
        if (this.secondSelectedDate !== null) {
          resetActiveAllDates(this.dates);
          setActiveDate(date, this.dates, !date.active);
          this.firstSelectedDate = date;
          this.secondSelectedDate = null;
        } else if (
          moment(this.firstSelectedDate.momentDate).isBefore(date.momentDate)
        ) {
          this.secondSelectedDate = date;
          const indexSelectedDate = getIndexOfDate(
            this.secondSelectedDate,
            this.dates
          );
          let indexActiveDate = getIndexOfDate(
            this.firstSelectedDate,
            this.dates
          );
          if (indexActiveDate === -1) {
            indexActiveDate = 0;
          }

          setActiveDateForRange(
            indexActiveDate,
            indexSelectedDate,
            this.dates,
            true
          );
        } else {
          resetActiveAllDates(this.dates);
          setActiveDate(date, this.dates, !date.active);
          this.firstSelectedDate = date;
        }
      }
      this.$emit("first-date", this.firstSelectedDate);
      this.$emit("second-date", this.secondSelectedDate);
    },
  },
  mounted: function () {
    this.dates = getDates(
      this.currentDate.month() + 1,
      this.currentDate.year(),
      this.columns * this.rows,
      this.firstSelectedDate,
      this.secondSelectedDate
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-dp {
  display: flex;
  flex-direction: column;
  width: 351px;
  height: 365px;
  background: #FFFFFF;
  box-shadow: 0px 20px 45px -20px #8A89F4;
  border-radius: 10px;
  padding: 25px 35px 40px 35px;
}

.container-dp .dp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 25px 0;
}

.container-dp .dp-header .dp-month {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  text-align: center;
  user-select: none;

  color: #151229;
}

.container-dp .dp-header .material-icons-outlined {
  font-size: 24px;
  color: #202842;
  user-select: none;
}

.container-dp .dp-header .material-icons-outlined:hover {
  cursor: pointer;
  opacity: 0.8;
}

.container-dp .dp-header .material-icons-outlined:active {
  opacity: 0.6;
}

.container-dp .dp-separator {
  width: 351px;
  border-top: 1px solid #F1F0FE;
  border-bottom: 0;
  margin-left: -35px;
  padding-right: 68px;
  margin-top: 0;
  margin-bottom: 0;
}

.container-dp .dp-body {
  margin: 25px 0 0 0px;
  display: flex;
  justify-content: center;
}

.container-dp .dp-body .dp-day-abrv {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  color: #151229;
  user-select: none;
  margin-bottom: 12.5px;
}

.container-dp .dp-body .dp-col {
  display: flex;
  flex-direction: column;
}

.dp-day {
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  user-select: none;

  padding: 12.5px 17px;

  color: #151229;
}

.dp-day:hover {
  background: #F1F0FE;
  cursor: pointer;

  opacity: 0.5;
}

.dp-date-active {
  background: #F1F0FE;
}

.dp-day-offset-before {
  opacity: 0.2;
}

.dp-day-offset-after {
  mix-blend-mode: normal;
  opacity: 0.6;
}
</style>
