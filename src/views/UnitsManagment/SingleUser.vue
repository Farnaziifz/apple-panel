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
                  <h4 class="mb-3">تصاویر واحد</h4>
                  <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>تصویر اصلی</p>
                      <div class="img-container" v-if="unit.image">
                        <img
                          :src="`https://api.almaskarimkhan.com${unit.image}`"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>تصویر ویترین</p>
                      <div class="img-container" v-if="unit.vitrin_image">
                        <div class="img-container">
                          <img
                            :src="
                              `https://api.almaskarimkhan.com${unit.vitrin_image}`
                            "
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <div class="img-container">
                        <p>تصویر اسلایدر</p>
                        <div class="img-container">
                          <div class="img-container" v-if="unit.slider_image">
                            <img
                              :src="
                                `https://api.almaskarimkhan.com${unit.slider_image}`
                              "
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 class="mt-4 mb-4">اطلاعات واحد</h4>
                  <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>نام واحد: </span> <span>{{ unit.name }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>نام مالک گالری: </span>
                        <span>{{ unit.last_name }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>وضعیت واحد: </span> <span>{{ unit.status }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>ایمیل واحد: </span> <span>{{ unit.email }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>شماره موبایل واحد: </span>
                        <span>{{ unit.phone_number }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>کدپستی واحد: </span>
                        <span>{{ unit.postal_code }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>دسته بندی واحد: </span>
                        <span>{{ unit.unit_category.name }}</span>
                      </p>
                    </div>
                  
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>پلاک واحد: </span>
                        <span>{{ unit.pluck.number }}</span>
                      </p>
                    </div>
              
                   
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>میزان تخفیف تعیین شده از سمت واحد: </span>
                        <span>{{ unit.discount }}</span>
                      </p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <p>
                        <span>توضیحات: </span>
                        <span>{{ unit.description }}</span>
                      </p>
                    </div>
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
      unit: null,
    };
  },

  created() {
    this.getUnit();
  },
  methods: {
    async getUnit() {
      const response = await this.$ApiServiceLayer.get(
        `unit/${this.$route.params.id}`
      );
      console.log(response);
      if (response.responseCode === 200) {
        this.unit = response.data;
      }
      if (response.status === 401) {
        window.localStorage.removeItem("almas-admin-store");
        this.$router.push({ path: "/login" });
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
