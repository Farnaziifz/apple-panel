<template>
  <div class="steper-container container">
    <div class="line-container bg-primary">
      <div
        class="step step1"
        :class="{ active: activeStep == 1 }"
        @click="sendStep(1)"
      >
        <span>مرحله اول</span>
      </div>
      <div
        class="step step2"
        :class="{ active: activeStep == 2 }"
        @click="sendStep(2)"
      >
        <span>مرحله دوم</span>
      </div>
      <div
        class="step step3"
        :class="{ active: activeStep == 3 }"
        @click="sendStep(3)"
      >
        <span>مرحله سوم</span>
      </div>
      <div
        class="step step4"
        :class="{ active: activeStep == 4 }"
        @click="sendStep(4)"
      >
        <span>مرحله چهارم</span>
      </div>
      <div
        class="step step5"
        :class="{ active: activeStep == 5 }"
        @click="sendStep(5)"
      >
        <span>مرحله پنجم</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activeStep: {
      default: 1,
      type: Number,
    },
  },
  data() {
    return {
      activeStepData: Number(this.$route.params.step),
      route: Number(this.$route.params.step),
    };
  },
  created() {
    this.activeStep = this.route;
  },
  methods: {
    sendStep(step) {
      this.activeStep = step;
      if (window.localStorage.getItem("pid")) {
        this.$router
          .replace({
            name: "product-add",
            params: { step: step, pId: window.localStorage.getItem("pid") },
          })
          .catch(() => {});
      } else {
        this.$router
          .replace({
            name: "product-add",
            params: { step: step },
          })
          .catch(() => {});
      }

      this.$emit("step", step);
    },
  },
};
</script>
<style lang="scss" scoped>
.line-container {
  width: 100%;
  height: 4px;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .step {
    width: 20px;
    height: 20px;
    background-color: #10163a;
    border: 2px solid #7367f0;
    border-radius: 50%;
    padding: 10px;
    position: relative;
    cursor: pointer;
    span {
      position: absolute;
      font-size: 12px;
      width: 70px;
      top: 30px;
      left: 40%;
      transform: translateX(-50%);
    }
  }
  .active {
    background-color: #7367f0;
  }
}
</style>
