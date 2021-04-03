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
                  <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="name" label="نام" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="last_name" label="نام خانوادگی" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="email" label="آدرس ایمیل" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="phone" label="شماره تماس" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="password" label="رمز عبور" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="home_phone" label="شماره منزل" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-input v-model="postalCode" label="کدپستی" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-dropdown
                        :items="proviance"
                        title="استان"
                        @input="setUserCity"
                        :optionPlaceholder="oldUserProviance"
                      />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-dropdown
                        :items="city"
                        title="شهر"
                        @input="getUserCity"
                        :optionPlaceholder="oldUserCity"
                      />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <fav-input v-model="address" label="ادرس پستی" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-file-upload
                        label="تصویر کاربر"
                        @input="getUserPic"
                      />
                      <div class="img-container" v-if="userUrl">
                        <div class="close-btn" @click="removeVitrin()">
                          <button class="btn btn-danger">X</button>
                        </div>
                        <img :src="userUrl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="btn-container">
                    <button class="btn btn-success" @click="editUser">
                      ویرایش کاربر
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
      proviance: [],
      city: [],
      userBrnad: "",
      oldUserCity: "",
      oldUserProviance: "",
      name: "",
      last_name: "",
      phone: "",
      email: "",
      home_phone: "",
      password: "",
      postalCode: "",
      address: "",
      city_id: null,
      province_id: null,
      userUrl: null,
      userUrlSelected: null,
    };
  },
  created() {
    this.getProvianve();
    this.getUserData();
  },
  methods: {
    async getProvianve() {
      const response = await this.$ApiServiceLayer.get("province");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.proviance.push({ text: item.name, value: item.id });
        });
      }
    },
    async getUserData() {
      const response = await this.$ApiServiceLayer.get(
        `user/${this.$route.params.id}`
      );
      if (response.responseCode === 200) {
        this.name = response.data.name;
        this.last_name = response.data.last_name;
        this.phone = response.data.mobile;
        this.home_phone = response.data.home_number;
        this.email = response.data.email;
        this.postalCode = response.data.postal_code;
        this.address = response.data.default_address.address;
        this.oldUserProviance = response.data.province;
        this.oldUserCity = response.data.city;
        this.userUrl = response.data.image;
      }
    },
    async setUserCity(value) {
      this.city = [];
      this.province_id = value.value;
      const response = await this.$ApiServiceLayer.get(
        `city?province_id=${value.value}`
      );
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.city.push({ text: item.name, value: item.id });
        });
      }
    },
    getUserCity(value) {
      this.city_id = value.value;
    },
    async editUser() {
      let fd = new FormData();
      fd.append("name", this.name);
      fd.append("last_name", this.last_name);
      fd.append("email", this.email);
      fd.append("home_number", this.home_phone);
      fd.append("postal_code", this.postalCode);
      fd.append("address", this.address);
      fd.append("mobile", this.phone);
      fd.append("province_id", Number(this.province_id));
      fd.append("city_id", Number(this.city_id));
      fd.append("image", this.userUrlSelected);
      const response = await this.$ApiServiceLayer.post(
        `user/${this.$route.params.id}?_method=PUT`,
        fd
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "primary",
          text: "کاربر مورد نظر با موفقیت ویرایش شد!",
        });
        this.$router.push({ path: "/user-list" });
      }
    },
    getUserPic(value) {
      this.userUrl = URL.createObjectURL(value.files[0]);
      this.userUrlSelected = value.files[0];
    },
    removeVitrin() {
      this.userUrl = null;
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
  margin-bottom: 20px;
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
</style>
