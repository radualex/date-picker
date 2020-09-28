<template>
  <div class="container">
    <div class="header">
      <span class="dates">Sep. 12, 2020 - Sep. 19, 2020 </span>
      <i class="material-icons-outlined">view_agenda</i>
    </div>
    <DatePicker />
  </div>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  name: "Card",
  props: {},
  components: {
    DatePicker,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container .header {
  display: flex;
  align-items: center;
  background: #FFFFFF;
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
  background: #F1F0FE;
  border-radius: 5px;
  color: #6362DB;
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
