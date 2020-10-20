<template>
  <div class="container">
    <div class="header">
      <span class="dates">{{ datesText }}</span>
      <i class="material-icons-outlined">view_agenda</i>
    </div>
    <DatePicker
      @first-date="handleFirstDatePicked($event)"
      @second-date="handleSecondDatePicked($event)"
    />
  </div>
</template>

<script>
import moment from "moment";
import DatePicker from "date-picker-vue3";

export default {
  name: "Card",
  props: {},
  data() {
    return {
      datesText: "",
    };
  },
  components: {
    DatePicker,
  },
  methods: {
    handleFirstDatePicked(firstDate) {
      if (!firstDate) {
        return;
      }
      const toString = moment(firstDate.momentDate).format("MMM. DD, YYYY");
      this.datesText = `${toString}`;
    },
    handleSecondDatePicked(secondDate) {
      if (!secondDate) {
        return;
      }
      const toString = moment(secondDate.momentDate).format("MMM. DD, YYYY");
      this.datesText = `${this.datesText} - ${toString}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container .header {
  display: flex;
  align-items: center;
  width: 420px;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px 13px 12px 35px;
  margin: 0 0 5px 0;
}

.container .header .dates {
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: #151229;
  margin: 0 101px 0 0;
}

.container .header i {
  font-size: 34px;
  padding: 16px;
  background: #f1f0fe;
  border-radius: 5px;
  color: #6362db;
  user-select: none;
}

.container .header i:hover {
  cursor: pointer;
  opacity: 0.8;
}

.container .header i:active {
  opacity: 0.6;
}
</style>
