<template>
  <div class="step-1 container border rounded p-2">
    <h5>مرحله دوم: افزودن عکس و گالری محصول</h5>
    <div class="form-container mt-4">
      <div class="row">
        <div class="col-12">
          <h6>افزودن عکس اصلی محصول</h6>
          <fav-file-upload @input="getMainPic" />
          <div class="img-container" v-if="mainUrl">
            <div class="close-btn" @click="removeMain(imgId)">
              <button class="btn btn-danger">X</button>
            </div>
            <img :src="mainUrl" />
          </div>
        </div>
        <div class="col-12 mt-4">
          <h6>افزودن عکس‌های گالری محصول</h6>
          <fav-file-upload @input="getGallery" />
          <div class="album">
            <template v-for="item in gallery">
              <div class="img-container" v-if="gallery.length" :key="item.id">
                <div class="close-btn" @click="removeMain(item.id)">
                  <button class="btn btn-danger">X</button>
                </div>
                <img :src="item.url" />
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="btn-container">
            <button class="btn btn-info" @click="AddAndGo">
              ثبت عکس و مرحله بعد
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
      mainUrl: "",
      mainUrlSelected: "",
      gallery: [],
      imgId: null,
    };
  },
  created() {
    this.getMainImage();
  },
  methods: {
    async getMainPic(value) {
      this.mainUrlSelected = value.files[0];
      let fd = new FormData();
      fd.append("main_image", value.files[0]);
      fd.append("product_id", Number(this.$route.params.pId));
      const response = await this.$ApiServiceLayer.post(
        "store-main-image-product",
        fd
      );
      if (response.responseCode === 200) {
        this.imgId = response.image_id;
        this.getMainImage();
      }
    },
    async getMainImage() {
      const response = await this.$ApiServiceLayer.get(
        `get-image-product/${this.$route.params.pId}`
      );
      if (response.responseCode === 200) {
        this.mainUrl = response.data.main_image.url;
        this.gallery = response.data.image_galleries;
      }
    },

    async getGallery(value) {
      let fd = new FormData();
      fd.append("image", value.files[0]);
      fd.append("product_id", Number(this.$route.params.pId));
      const response = await this.$ApiServiceLayer.post(
        "store-gallery-product",
        fd
      );
      if (response.responseCode === 200) {
        this.gallery.push(response.product_image_id.url);
        this.getMainImage()
      }
    },
    async removeMain(id) {
      let fd = new FormData();
      fd.append("product_image_id", id);
      fd.append("product_id", this.$route.params.pId);
      const response = await this.$ApiServiceLayer.post(
        "delete-image-gallery-product",
        fd
      );
      if (response.responseCode === 200) {
        this.getMainImage();
      }
    },
    AddAndGo() {
      this.$emit("step", 3);
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
.img-container {
  width: 250px;
  height: 250px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .close-btn {
    position: absolute;
    top: 40px;
    right: 0;
    .btn {
      min-width: 30px !important;
    }
  }
}
.album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
