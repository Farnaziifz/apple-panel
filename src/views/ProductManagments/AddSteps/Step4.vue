<template>
  <div class="step-3 container border rounded p-2">
    <div class="row">
      <div class="price-container">
        <div class="item bg-gradient-dark">
          <h6>قیمت دلار واحد</h6>
          <p>{{ allPrice.dollar_price }}</p>
        </div>
        <div class="item bg-gradient-dark">
          <h6>قیمت طلای ۱۸ عیار</h6>
          <p>{{ allPrice.gold_price }}</p>
        </div>
        <div class="item bg-gradient-dark">
          <h6>قیمت طلای ۲۴ عیار</h6>
          <p>{{ allPrice.twenty_price }}</p>
        </div>
        <div class="item bg-gradient-dark">
          <h6>قیمت دلار واحد</h6>
          <p>{{ allPrice.unit_dollar }}</p>
        </div>
        <div class="item bg-gradient-dark">
          <h6>قیمت طلای ۱۸ عیار واحد</h6>
          <p>{{ allPrice.unit_gold }}</p>
        </div>
        <div class="item bg-gradient-dark">
          <h6>قیمت طلای ۲۴ عیار واحد</h6>
          <p>{{ allPrice.unit_twenty }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <fav-dropdown
          :items="pricing_method"
          title="انتخاب روش محاسبه قیمت"
          @input="getPriceMethod"
        />
        <div class="dollar-container" v-if="current_method === 1">
          <div class="row">
            <div class="col-lg-5 col-md-12 col-sm-12">
              <fav-input
                label="قیمت محصول بر اساس دلار"
                type="number"
                v-model="d_price"
              />
            </div>
            <div class="col-lg-5 col-md-12 col-sm-12">
              <fav-input
                label="میزان تخفیف برای این محصول"
                type="number"
                v-model="discount"
              />
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
              <div class="btn-container">
                <div class="btn btn-warning" @click="addDollarPrice">
                  مشاهده قیمت نهایی
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rial-container" v-if="current_method === 2">
          <div class="row">
            <div class="col-lg-5 col-md-12 col-sm-12">
              <fav-input
                label="قیمت محصول ریالی"
                type="number"
                v-model="r_price"
              />
            </div>
            <div class="col-lg-5 col-md-12 col-sm-12">
              <fav-input
                label="میزان تخفیف برای این محصول"
                type="number"
                v-model="discount"
              />
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
              <div class="btn-container">
                <div class="btn btn-warning" @click="addRialPrice">
                  مشاهده قیمت نهایی
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gold-18-container" v-if="current_method === 3">
          <div class="row">
            <div class="col-12"></div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input
                label="وزن طلای ۱۸ عیار"
                type="number"
                v-model="weight_18"
              />
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input label="اجرت ساخت" type="number" v-model="fee" />
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input label="درصد اجرت" type="number" v-model="wage" />
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input label="تخفیف" type="number" v-model="discount" />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="btn-container">
                <div class="btn btn-warning" @click="add18Gold">
                  ثبت و مشاهده قیمت نهایی
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gold-18-container" v-if="current_method === 4">
          <div class="row">
            <div class="col-12"></div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input
                label="وزن طلای ۲۴ عیار"
                type="number"
                v-model="weight_18"
              />
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input label="اجرت ساخت" type="number" v-model="fee" />
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input label="درصد اجرت" type="number" v-model="wage" />
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <fav-input label="تخفیف" type="number" v-model="discount" />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="btn-container">
                <div class="btn btn-warning" @click="add24Gold">
                  ثبت و مشاهده قیمت نهایی
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="final-price-container" v-if="factor">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-1">
              <span>قیمت نهایی:</span>
              <span class="ml-1">{{
                factor.calculated_price | toPersianCurrency("ریال", 0)
              }}</span>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-1">
              <span>میزان تخفیف اعمال شده: </span>
              <span>{{ factor.product_has_discount }} درصد </span>
            </div>

            <div
              class="col-lg-4 col-md-6 col-sm-12 mb-1"
              v-if="current_method === 1"
            >
              <span>قیمت دلار محاسبه شده:</span>
              <span>{{
                factor.meta.dollar_price | toPersianCurrency("ریال", 0)
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="btn btn-success mt-4"
          v-if="factor && current_method === 1"
          @click="doneDone"
        >
          ثبت نهایی بر اساس قمیت مقطوع دلاری
        </div>
        <div
          class="btn btn-success mt-4"
          v-if="factor && current_method === 2"
          @click="doneRial"
        >
          ثبت نهایی بر اساس قمیت مقطوع ریالی
        </div>
        <div
          class="btn btn-success mt-4"
          v-if="factor && current_method === 3"
          @click="done18"
        >
          ثبت نهایی بر اساس فرمول ۱۸ عیار
        </div>
        <div
          class="btn btn-success mt-4"
          v-if="factor && current_method === 4"
          @click="done24"
        >
          ثبت نهایی بر اساس فرمول 24 عیار
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pricing_method: [
        { text: "قیمت مقطوع دلاری", value: 1 },
        { text: "قیمت مقطوع ریالی", value: 2 },
        { text: "قیمت بر اساس فرمول برای ۱۸ عیار", value: 3 },
        { text: "قیمت بر اساس فرمول برای ۲۴ عیار", value: 4 },
      ],
      current_method: null,
      d_price: "",
      r_price: "",
      discount: "",
      factor: null,
      weight_18: null,
      fee: null,
      wage: 7,
      fee_type: 1,
      allPrice: null,
    };
  },
  created() {
    this.getAllPrices();
  },
  methods: {
    async getAllPrices() {
      const response = await this.$ApiServiceLayer.get(
        `get-currencies-values/${this.$route.params.pId}`
      );
      if (response.responseCode === 200) {
        this.allPrice = response.data;
      }
    },
    getPriceMethod(value) {
      this.current_method = value.value;
    },

    async addDollarPrice() {
      this.factor = null;
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("dollar_price", this.d_price);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `calculate-product-price/${this.$route.params.pId}`,
        fd
      );

      if (response.responseCode === 200) {
        this.factor = response.data;
      }
    },
    async addRialPrice() {
      this.factor = null;
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("rial_price", this.r_price);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `calculate-product-price/${this.$route.params.pId}`,
        fd
      );
      if (response.responseCode === 200) {
        this.factor = response.data;
      }
    },
    async add18Gold() {
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("fee_type", this.fee_type);
      fd.append("fee", this.fee);
      fd.append("wage", this.wage);
      fd.append("weight", this.weight_18);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `calculate-product-price/${this.$route.params.pId}`,
        fd
      );
      if (response.responseCode === 200) {
        this.factor = response.data;
      }
    },
    async add24Gold() {
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("fee_type", this.fee_type);
      fd.append("fee", this.fee);
      fd.append("wage", this.wage);
      fd.append("weight", this.weight_18);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `calculate-product-price/${this.$route.params.pId}`,
        fd
      );
      if (response.responseCode === 200) {
        this.factor = response.data;
      }
    },
    async doneDone() {
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("dollar_price", this.d_price);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `update-product-price/${this.$route.params.pId}`,
        fd
      );

      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "قیمت به درستی محاسبه و ذخیره شد!",
        });
        this.$emit("step", 3);
      }
    },
    async doneRial() {
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("rial_price", this.r_price);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `update-product-price/${this.$route.params.pId}`,
        fd
      );
      if (response.responseCode === 200) {
        if (response.responseCode === 200) {
          this.$notify({
            group: "tc",
            type: "success",
            text: "قیمت به درستی محاسبه و ذخیره شد!",
          });
          this.$emit("step", 3);
        }
      }
    },
    async done18() {
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("fee_type", this.fee_type);
      fd.append("fee", this.fee);
      fd.append("wage", this.wage);
      fd.append("weight", this.weight_18);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `update-product-price/${this.$route.params.pId}`,
        fd
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "قیمت به درستی محاسبه و ذخیره شد!",
        });
        this.$emit("step", 3);
      }
    },
    async done24() {
      let fd = new FormData();
      fd.append("price_method", this.current_method);
      fd.append("fee_type", this.fee_type);
      fd.append("fee", this.fee);
      fd.append("wage", this.wage);
      fd.append("weight", this.weight_18);
      fd.append("discount", this.discount);
      const response = await this.$ApiServiceLayer.post(
        `update-product-price/${this.$route.params.pId}`,
        fd
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "قیمت به درستی محاسبه و ذخیره شد!",
        });
        this.$emit("step", 3);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.price-container {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  .item {
    width: 100%;
    height: 100%;
    margin: 0 10px;
    padding: 10px;
    border-radius: 4px;
  }
}

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

.final-price-container {
  border: 2px solid yellow;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    span {
      margin-bottom: 10px;
    }
  }
}
.item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100%;
  p {
    margin-bottom: 0;
  }
}
</style>
