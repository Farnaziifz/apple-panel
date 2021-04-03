<template>
  <div class="step-1 container border rounded p-2">
    <h5>مرحله اول: افزودن اطلاعات کلی محصول</h5>
    <div class="form-container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <fav-input v-model="productName" label="نام محصول" />
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
          <fav-input v-model="productSlug" label="نشانک محصول" />
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
          <fav-input v-model="productCount" label="تعداد محصول" type="number" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <fav-input v-model="productCode" label="کد محصول" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <fav-search-dropdown
            endpoint="unit?q"
            label="واحد"
            @selectedItem="getUnitSelec"
            :optionPlaceholder="oldUnit"
          />
          <!-- <span>{{ oldUnit }}</span> -->
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <fav-input v-model="seo_desc" label="توضیح کوتاه" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <fav-dropdown
            :items="productCategory"
            title="دسته بندی محصول"
            @input="getCategory"
            :optionPlaceholder="oldCat"
          />
        </div>
        <div class="col-lg-12 col-md-6 col-sm-12">
          <fav-text-area v-model="desc" label="توضیح بلند" type="textare" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="btn-container">
            <button
              class="btn btn-warning"
              @click="editAndGo"
              v-if="$route.params.pId"
            >
              به روزرسانی و مرحله بعد
            </button>
            <button class="btn btn-info" @click="AddAndGo" v-else>
              ثبت و مرحله بعد
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: null,
      productSlug: null,
      productCode: null,
      seo_desc: null,
      desc: null,
      productCategory: [],
      productCount: null,
      unitData: [],
      category_id: null,
      unit_id: null,
      oldUnit: null,
      oldCat: null,
    };
  },
  created() {
    this.getProductCategory();
    this.getUnit();
    if (this.$route.params.pId) {
      this.getBasic();
    }
  },

  methods: {
    async getBasic() {
      const response = await this.$ApiServiceLayer.get(
        `get-basic-product/${this.$route.params.pId}`
      );
      if (response.responseCode === 200) {
        this.productName = response.data.name;
        this.productSlug = response.data.slug;
        this.productCode = response.data.product_code;
        this.productCount = response.data.count;
        this.seo_desc = response.data.seo_desc;
        this.desc = response.data.desc;
        this.oldUnit = response.data.unit.name;
        this.unit_id = response.data.unit.id;
        this.oldCat = response.data.category.name;
        this.category_id = response.data.category.id;
      }
    },
    async getProductCategory() {
      const response = await this.$ApiServiceLayer.get("category");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.productCategory.push({ text: item.name, value: item.id });
        });
      }
    },
    async getUnit() {
      const response = await this.$ApiServiceLayer.get("unit");
      if (response.responseCode === 200) {
        response.data.data.forEach((item) => {
          this.unitData.push({ text: item.name, value: item.id });
        });
      }
    },
    getUnitSelec(value) {
      this.unit_id = value.id;
    },
    getCategory(value) {
      this.category_id = value.value;
    },
    async AddAndGo() {
      const response = await this.$ApiServiceLayer.post("store-basic-product", {
        name: this.productName,
        slug: this.productSlug,
        product_code: this.productCode,
        count: this.productCount,
        category_id: this.category_id,
        desc: this.desc,
        seo_desc: this.seo_desc,
        unit_id: this.unit_id,
      });
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: response.success,
        });
        window.localStorage.setItem("pid", response.product_id);
        let data = {
          step: 2,
          productID: response.product_id,
        };
        this.$emit("step", data);
      } else {
        if (response.data.responseCode === 401) {
          this.$notify({
            group: "tc",
            type: "danger",
            text: "ورود تمایم فیلدهای زیر الزامی است",
          });
        }
      }
    },
    async editAndGo() {
      const response = await this.$ApiServiceLayer.post(
        `update-basic-product/${this.$route.params.pId}`,
        {
          name: this.productName,
          slug: this.productSlug,
          product_code: this.productCode,
          count: this.productCount,
          category_id: this.category_id,
          desc: this.desc,
          seo_desc: this.seo_desc,
          unit_id: this.unit_id,
        }
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: response.success,
        });
        window.localStorage.setItem("pid", response.product_id);
        let data = {
          step: 2,
          productID: response.product_id,
        };
        this.$emit("step", data);
      } else {
        if (response.data.responseCode === 401) {
          this.$notify({
            group: "tc",
            type: "danger",
            text: "ورود تمایم فیلدهای زیر الزامی است",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  margin-top: 20px;
}

.btn-container {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
}
</style>
