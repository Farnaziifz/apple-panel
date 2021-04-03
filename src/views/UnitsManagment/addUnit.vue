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
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="userBrnad" label="نام برند" />
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="ownerBrand" label="نام مدیر" />
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="email" label="آدرس ایمیل" />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="phone" label="شماره تلفن" type="number" />
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="password" label="رمز عبور" />
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input
                    v-model="postalCode"
                    label="کد پستی"
                    type="number"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="floor" label="طبقه" type="number" />
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="unit" label="واحد" type="number" />
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="desc" label="توضیحات" />
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <fav-input v-model="address" label="نشانی کامل پستی" />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <fav-input v-model="slug" label="نشانک" />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="unitStatus"
                    title="وضعیت واحد"
                    @input="setUnitSatatus"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="unitCategory"
                    title="دسته بندی واحد"
                    @input="setUnitCategory"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12">
                  <h5>آپلود عکس واحدها</h5>
                  <div class="row mt-2">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-file-upload
                        label="تصویر اسلاید"
                        @input="getSlidePic"
                      />
                      <div class="img-container" v-if="slideUrl">
                        <div class="close-btn" @click="removeSlide()">
                          <button class="btn btn-danger">X</button>
                        </div>
                        <img :src="slideUrl" />
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-file-upload label="تصویر اصلی" @input="getMainPic" />
                      <div class="img-container" v-if="MainUrl">
                        <div class="close-btn" @click="removeMain()">
                          <button class="btn btn-danger">X</button>
                        </div>
                        <img :src="MainUrl" />
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-file-upload
                        label="تصویر ویترین"
                        @input="getVitrinPic"
                      />
                      <div class="img-container" v-if="vitrinUrl">
                        <div class="close-btn" @click="removeVitrin()">
                          <button class="btn btn-danger">X</button>
                        </div>
                        <img :src="vitrinUrl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="btn-container">
                    <button class="btn btn-success" @click="addUnit">
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
      unitStatus: [],
      unitCategory: [],
      userName: "",
      slideUrl: null,
      slideUrlSelected: null,
      MainUrl: null,
      mainUrlSelected: null,
      vitrinUrl: null,
      vitrinUrlSelected: null,
      userBrnad: "",
      ownerBrand: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      floor: "",
      unit: "",
      desc: "",
      password: "",
      selectedUnitStatus: null,
      selectedUnitCategory: null,
      slug: "",
    };
  },
  created() {
    this.getUnitStatus();
    this.getUnitCatgeory();
  },
  methods: {
    async getUnitStatus() {
      const response = await this.$ApiServiceLayer.get("unit_status");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.unitStatus.push({ text: item.name, value: item.id });
        });
      }
    },
    setUnitCategory(value) {
      this.selectedUnitCategory = value.value;
    },
    setUnitSatatus(value) {
      this.selectedUnitStatus = value.value;
    },
    async getUnitCatgeory() {
      const response = await this.$ApiServiceLayer.get("unit_category");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.unitCategory.push({ text: item.name, value: item.id });
        });
      }
    },
    getSlidePic(value) {
      this.slideUrl = URL.createObjectURL(value.files[0]);
      this.slideUrlSelected = value.files[0];
    },
    getMainPic(value) {
      this.MainUrl = URL.createObjectURL(value.files[0]);
      this.mainUrlSelected = value.files[0];
    },
    getVitrinPic(value) {
      this.vitrinUrl = URL.createObjectURL(value.files[0]);
      this.vitrinUrlSelected = value.files[0];
    },
    removeMain() {
      this.MainUrl = null;
    },
    removeSlide() {
      this.slideUrl = null;
    },
    removeVitrin() {
      this.vitrinUrl = null;
    },
    async addUnit() {
      let fd = new FormData();
      fd.append("name", this.userBrnad);
      fd.append("image", this.mainUrlSelected);
      fd.append("slide_image", this.slideUrlSelected);
      fd.append("vitrin_image", this.vitrinUrlSelected);
      fd.append("last_name", this.ownerBrand);
      fd.append("password", this.password);
      fd.append("email", this.email);
      fd.append("unit_status_id", this.selectedUnitStatus);
      fd.append("unit_category_id", this.selectedUnitCategory);
      fd.append("pluck_floor", this.floor);
      fd.append("phone_number", this.phone);
      fd.append("pluck_number", this.unit);
      fd.append("description", this.desc);
      fd.append("postal_code", this.postalCode);
      fd.append("slug", this.slug);
      const response = await this.$ApiServiceLayer.post("unit", fd);
      if (response.responseCode === 200) {
        this.$router.push({ path: "/unit-list" });
        this.$notify({
          group: "tc",
          type: "success",
          text: "واحد مورد نظر با موفقیت اضافه شد!",
        });
      } else {
        console.log(response);
        if (response.status === 401) {
          console.log(response.data.message);
        }
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
</style>
