<template>
  <div class="container-dp">
    <div class="dp-header">
      <i class="material-icons-outlined">arrow_back_ios</i>
      <span class="dp-month">September</span>
      <i class="material-icons-outlined">arrow_forward_ios</i>
    </div>
    <hr class="dp-separator" />
    <div class="dp-body">
      <div class="dp-body-header">
        <div
          v-for="(dayAbrv, index) in daysAbrvMap"
          :key="`dayAbrv - ${index}`"
          class="dp-day-abrv"
        >
          {{ dayAbrv }}
        </div>
      </div>
      <div class="dp-body-body"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: {},
  data() {
    return {
      daysAbrvMap: ["S", "M", "T", "W", "T", "F", "S"],
    };
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
  margin: 25px 0 0 0;
}

.container-dp .dp-body .dp-body-header {
  display: flex;
  gap: 43px;
  margin: 0 0 0 5px;
}
.container-dp .dp-body .dp-body-header .dp-day-abrv {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  color: #151229;
}
</style>
