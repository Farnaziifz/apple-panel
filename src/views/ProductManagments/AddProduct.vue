<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="row">
                <div class="col-12">
                  <div class="steper-container mb-3 p-2">
                    <Steper @step="getSteper" :activeStep="activeStep" />
                  </div>
                </div>
              </div>
              <Step1 v-if="$route.params.step == 1" @step="getStep1" />
              <Step2 v-if="$route.params.step == 2" @step="getStep2" />
              <Step3 v-if="$route.params.step == 3" @step="getStep3" />
              <Step4 v-if="$route.params.step == 4" @step="getStep4" />
              <Step5 v-if="$route.params.step == 5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Steper from "./AddSteps/Steper";
import Step1 from "./AddSteps/Step1";
import Step2 from "./AddSteps/Step2";
import Step3 from "./AddSteps/Step3";
import Step4 from "./AddSteps/Step4";
import Step5 from "./AddSteps/Step5";
export default {
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Steper,
  },

  data() {
    return {
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      activeStep: 1,
    };
  },

  methods: {
    getStep1(step) {
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;

      if (window.localStorage.getItem("pid")) {
        this.$router
          .replace({
            name: "product-add",
            params: { step: 2, pId: step.productID },
          })
          .catch(() => {});
      }
      this.activeStep = this.$route.params.step;
    },
    getStep2() {
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
      this.step4 = false;
      this.step5 = false;

      this.$router
        .replace({
          name: "product-add",
          params: { step: 3, pId: window.localStorage.getItem("pid") },
        })
        .catch(() => {});
      this.activeStep = this.$route.params.step;
    },
    getStep3() {
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = true;
      this.step5 = false;

      this.$router
        .replace({
          name: "product-add",
          params: { step: 4, pId: window.localStorage.getItem("pid") },
        })
        .catch(() => {});
      this.activeStep = this.$route.params.step;
    },
    getStep4() {
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = true;

      this.$router
        .replace({
          name: "product-add",
          params: { step: 5, pId: window.localStorage.getItem("pid") },
        })
        .catch(() => {});
      this.activeStep = this.$route.params.step;
    },
    getSteper(step) {
      switch (step) {
        case 1:
          this.step1 = true;
          this.step2 = false;
          this.step3 = false;
          this.step4 = false;
          this.step5 = false;
          break;
        case 2:
          this.step1 = false;
          this.step2 = true;
          this.step3 = false;
          this.step4 = false;
          this.step5 = false;
          break;
        case 3:
          this.step1 = false;
          this.step2 = false;
          this.step3 = true;
          this.step4 = false;
          this.step5 = false;
          break;
        case 4:
          this.step1 = false;
          this.step2 = false;
          this.step3 = false;
          this.step4 = true;
          this.step5 = false;
          break;
        case 5:
          this.step1 = false;
          this.step2 = false;
          this.step3 = false;
          this.step4 = false;
          this.step5 = true;
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
</style>
