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
                  <div
                    class="img-container mb-4"
                    v-if="
                      product.image_url &&
                        product.image_url[0] &&
                        product.image_url[0].url
                    "
                  >
                    <img :src="product.image_url[0].url" alt="" />
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>نام کامل محصول:</h6>
                    <span>{{ product.name }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>نام واحد:</h6>
                    <span>{{ product.unit.name }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>تعداد:</h6>
                    <span>{{ product.count }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>قیمت:</h6>
                    <span>{{
                      product.main_price | toPersianCurrency("ریال", 0)
                    }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>روش قیمت گذاری:</h6>
                    <span>{{ product.price_method }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>میزان تخفیف:</h6>
                    <span>{{ product.discount }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>وضعیت:</h6>
                    <span>{{ product.status }}</span>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="item">
                    <h6>توضیحات:</h6>
                    <span>{{ product.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      isLoading: false,
    };
  },

  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get(
        `product/${this.$route.params.id}`
      );

      if (response.responseCode === 200) {
        this.isLoading = false;
        this.product = response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
.img-container {
  width: 100%;
  height: 200px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .close-btn {
    position: absolute;
    top: -10px;
    right: 0;
    .btn {
      min-width: 30px !important;
    }
  }
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}

.item {
  display: flex;
  margin-bottom: 30px;
  span {
    margin-right: 20px;
  }
}

.img-container {
  margin-bottom: 40px;
}
</style>
