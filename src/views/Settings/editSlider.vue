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
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-input v-model="title" label="تایتل اسلایدر" />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-input v-model="text" label="متن اسلایدر" />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-input
                    v-model="order"
                    label="ترتیب اسلایدر"
                    type="number"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-input
                    v-model="visibility"
                    label="نمایش در وب‌سایت"
                    type="number"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-file-upload label="تصویر اسلایدر" @input="getSlidePic" />
                  <div class="img-container" v-if="slideUrl">
                    <div class="close-btn" @click="removeSlide()">
                      <button class="btn btn-danger">X</button>
                    </div>
                    <img :src="slideUrl" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-file-upload
                    label="تصویر موبایل اسلایدر"
                    @input="getMobileSlidePic"
                  />
                  <div class="img-container" v-if="mobileUrl">
                    <div class="close-btn" @click="removeMobile()">
                      <button class="btn btn-danger">X</button>
                    </div>
                    <img :src="mobileUrl" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="btn-container">
                    <button class="btn btn-success" @click="addSlider">
                      افزودن واحد
                    </button>
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
      slideUrl: null,
      slideUrlSelected: null,
      mobileUrl: null,
      mobileUrlSelected: null,
      title: null,
      text: null,
      visibility: 1,
      order: null,
    };
  },
  created() {
    this.getSlide();
  },
  methods: {
    async getSlide() {
      const response = await this.$ApiServiceLayer.get(
        `slider/${this.$route.params.id}`
      );
      console.log(response);
      if (response.responseCode === 200) {
        this.title = response.data.title;
        this.text = response.data.text;
        this.slideUrl = response.data.image.url;
        this.mobileUrl = response.data.mob_image.url;
        this.order = response.data.order;
      }
    },
    getSlidePic(value) {
      this.slideUrl = URL.createObjectURL(value.files[0]);
      this.slideUrlSelected = value.files[0];
    },
    getMobileSlidePic(value) {
      this.mobileUrl = URL.createObjectURL(value.files[0]);
      this.mobileUrlSelected = value.files[0];
    },
    removeSlide() {
      this.slideUrl = null;
      this.slideUrlSelected = null;
    },
    removeMobile() {
      this.mobileUrl = null;
      this.mobileUrlSelected = null;
    },
    async addSlider() {
      let fd = new FormData();
      fd.append("title", this.title);
      fd.append("text", this.text);
      fd.append("visibility", this.visibility);
      fd.append("image", this.slideUrlSelected);
      fd.append("mob_image", this.mobileUrlSelected);
      fd.append("order", this.order);
      const response = await this.$ApiServiceLayer.post(
        `slider/${this.$route.params.id}?_method=patch`,
        fd
      );
      if (response.responseCode === 200) {
        this.$router.push({ path: "/sliders" });
        this.$notify({
          group: "tc",
          type: "success",
          text: "اسلایدر مورد نظر با موفقیت اضافه شد!",
        });
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
  margin-top: 30px;
}
</style>
