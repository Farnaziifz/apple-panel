<template>
  <div class="step-3 container border rounded p-2">
    <div class="row">
      <h6 class="mr-2">نمایش محصول در وب سایت</h6>
      <fav-switch :value="status" @input="getNewSts" />
    </div>
    <div class="row">
      <div class="btn-container">
        <div class="btn btn-success" @click="goToList">
          ثبت نهایی
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: null,
    };
  },
  created() {
    this.getStatus();
  },
  methods: {
    async getStatus() {
      const response = await this.$ApiServiceLayer.get(
        `get-current-product-status/${this.$route.params.pId}`
      );
      console.log(response);
      if (response.responseCode === 200) {
        if (response.data.name === "غیرفعال") {
          this.status = 0;
        } else if (response.data.name === "فعال") {
          this.status = 1;
        }
      }
    },
    async getNewSts(value) {
      console.log(value);
      let fd = new FormData();
      fd.append("product_id", this.$route.params.pId);
      if (value === true) {
        fd.append("product_status_id", 2);
      } else {
        fd.append("product_status_id", 1);
      }
      const response = await this.$ApiServiceLayer.post(
        `update-product-status`,
        fd
      );
      if (response.responseCode === 200) {
        this.getStatus();
      }
    },
    goToList() {
      this.$router.push({ path: "/productList" });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  .btn {
    font-size: 12px;
    padding: 5px !important;
    line-height: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
