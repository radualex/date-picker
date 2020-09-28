<template>
  <Card />
</template>

<script>
import Card from "./components/Card.vue";
export default {
  name: "App",
  components: {
    Card,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Mulish;
  font-style: normal;
  padding: 0;
  background: #ADACFC;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
