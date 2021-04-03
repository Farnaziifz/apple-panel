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
                    v-if="product.image_url && product.image_url.url"
                  >
                    <img :src="product.image_url.url" alt="" />
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>نام کامل مقاله:</h6>
                    <span>{{ product.title }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>توضیحات سئو:</h6>
                    <span>{{ product.seo_desc }}</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="item">
                    <h6>دسته بندی:</h6>
                    <span>{{ product.article_category.name }}</span>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="">
                    <h6>متن مقاله:</h6>
                    <p v-html="product.body"></p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="tag-container mt-2">
                    <h6 class="mb-2">تگ‌های مقاله:</h6>
                    <fav-chip
                      v-for="item in product.keywords"
                      :key="item.id"
                      :text="item.name"
                    />
                  </div>
                </div>
              </div>
            </div>
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
      product: null,
    };
  },

  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      const response = await this.$ApiServiceLayer.get(
        `article/${this.$route.params.id}`
      );

      if (response.responseCode === 200) {
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
