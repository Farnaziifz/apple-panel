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
                    <div class="col-lg-12 col-md-6 col-sm-12">
                      <fav-input v-model="footer" label="توضیحات فوتر" />
                    </div>
                    <div class="col-12">
                      <h5>آپلود عکس واحدها</h5>
                      <div class="row mt-2">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <fav-file-upload
                            label="لوگو فوتر"
                            @input="getFotterLogo"
                          />
                          <div class="img-container" v-if="logoFooterUrl">
                            <div class="close-btn" @click="removeFooter">
                              <button class="btn btn-danger">X</button>
                            </div>
                            <img :src="logoFooterUrl" />
                          </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <fav-file-upload
                            label="لوگو اصلی"
                            @input="getVitrinPic"
                          />
                          <div class="img-container" v-if="logoUrl">
                            <div class="close-btn" @click="removeVitrin">
                              <button class="btn btn-danger">X</button>
                            </div>
                            <img :src="logoUrl" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <fav-file-upload
                            label="تصویر کالکشن ازدواج"
                            @input="getMarga"
                          />
                          <div class="img-container" v-if="mUrl">
                            <div class="close-btn" @click="removeMurl">
                              <button class="btn btn-danger">X</button>
                            </div>
                            <img :src="mUrl" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <fav-file-upload
                            label="تصویر کالکشن طبیعت"
                            @input="getNature"
                          />
                          <div class="img-container" v-if="nutreurl">
                            <div class="close-btn" @click="removen">
                              <button class="btn btn-danger">X</button>
                            </div>
                            <img :src="nutreurl" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <fav-file-upload
                            label="تصویر کالکشن فانتزی"
                            @input="getFurl"
                          />
                          <div class="img-container" v-if="fUrl">
                            <div class="close-btn" @click="removefurl">
                              <button class="btn btn-danger">X</button>
                            </div>
                            <img :src="fUrl" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="btn-container">
                        <button class="btn btn-primary" @click="editSetting">
                          ویرایش تنظیمات
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footer: null,
      logoFooterUrl: null,
      logoFooterUrlSelected: null,
      logoUrl: null,
      logoUrlSelected: null,
      mUrl: null,
      mUrlSelected: null,
      nutreurl: null,
      nutreurlSelected: null,
      fUrl: null,
      fUrlSelected: null,
    };
  },
  created() {
    this.getPages();
  },
  methods: {
    async getPages() {
      const response = await this.$ApiServiceLayer.get("get-settings");
      if (response.responseCode === 200) {
        this.footer = response.data.footer_desc;
        this.logoFooterUrl = response.data.footer_logo[0].url;
      }
    },
    getFotterLogo(value) {
      this.logoFooterUrl = URL.createObjectURL(value.files[0]);
      this.logoFooterUrlSelected = value.files[0];
    },
    getVitrinPic(value) {
      this.logoUrl = URL.createObjectURL(value.files[0]);
      this.logoUrlSelected = value.files[0];
    },
    removeFooter() {
      this.logoFooterUrl = null;
      this.logoFooterUrlSelected = null;
    },
    removeVitrin() {
      this.logoUrl = null;
      this.logoUrlSelected = null;
    },
    getMarga(value) {
      this.mUrl = URL.createObjectURL(value.files[0]);
      this.mUrlSelected = value.files[0];
    },
    removeMurl() {
      this.mUrl = null;
      this.mUrlSelected = null;
    },
    getNature(value) {
      this.nutreurl = URL.createObjectURL(value.files[0]);
      this.nutreurlSelected = value.files[0];
    },
    removen() {
      this.nutreurl = null;
      this.nutreurlSelected = null;
    },
    getFurl(value) {
      this.fUrl = URL.createObjectURL(value.files[0]);
      this.fUrlSelected = value.files[0];
    },
    removefurl() {
      this.fUrl = null;
      this.fUrlSelected = null;
    },
    async editSetting() {
      let fd = new FormData();
      fd.append("footer_desc", this.footer);
      fd.append("footer_logo", this.logoFooterUrlSelected);
      fd.append("logo_image", this.logoUrlSelected);
      fd.append("marriage_collection", this.mUrlSelected);
      fd.append("nature_collection", this.nutreurlSelected);
      fd.append("fantasy_collection", this.fUrlSelected);
      const response = await this.$ApiServiceLayer.post("update-settings", fd);
      console.log(response);
      if (response.responseCode === 200) {
        this.getPages();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
.operation {
  i {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.btn-filter-container {
  display: flex;
  height: 100%;
  align-items: center;
}
.filter-btn {
  color: purple;
  width: 100%;
  background-color: #00cfe8;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  span {
    color: purple;
  }
}
.head-item {
  display: flex;
  align-items: center;
  .btn {
    margin-right: 20px;
  }
}
.menu-item {
  width: 100%;
  height: 100px;
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  padding: 10px;
  flex-direction: column;

  .img-container {
    width: 100%;
    border-left: 1px solid gray;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .info-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    h1 {
      font-weight: bolder;
      margin-bottom: 20px;
    }
  }
  .btn-danger {
    position: absolute;
    top: -10px;
    padding: 4px;
    right: -10px;
    min-width: 40px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .btn-info {
    position: absolute;
    top: -10px;
    padding: 4px;
    right: 40px;
    min-width: 40px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
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
</style>
