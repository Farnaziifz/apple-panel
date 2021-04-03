<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/addSlider">
          <button class="btn btn-primary mb-2">
            افزودن اسلایدر
          </button>
        </router-link>
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="row">
                <div class="col-12">
                  <div class="slider-container p-2">
                    <div class="slider-list">
                      <div class="row">
                        <div
                          class="col-lg-12 col-md-12 col-sm-12"
                          v-for="item in slider"
                          :key="item.id"
                        >
                          <div class="slider-item">
                            <div
                              class="btn btn-danger"
                              @click="delSlider(item.id)"
                            >
                              x
                            </div>
                            <div
                              class="btn btn-info"
                              @click="gotoEdit(item.id)"
                            >
                              <i class="feather icon-edit"></i>
                            </div>
                            <div class="img-container" v-if="item.image.url">
                              <img :src="item.image.url" alt="" />
                            </div>
                            <div class="info-container">
                              <h1 class="title">{{ item.title }}</h1>
                              <p>{{ item.text }}</p>
                              <!-- <h6 class="mt-4">نمایش اسلایدر در وب سایت</h6>
                              <fav-switch
                                :value="item.status"
                                @input="getNewSts"
                              /> -->
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slider: null,
    };
  },
  created() {
    this.getSlider();
  },
  methods: {
    async getSlider() {
      const response = await this.$ApiServiceLayer.get("slider");
      if (response.responseCode === 200) {
        this.slider = response.data;
      }
    },
    getNewSts() {},
    async delSlider(id) {
      const response = await this.$ApiServiceLayer.delete(`slider/${id}`);
      if (response.responseCode === 200) {
        this.getSlider();
        this.$notify({
          group: "tc",
          type: "danger",
          text: "اسلایدر مورد نظر با موفقیت حذف شد!",
        });
      }
    },
    gotoEdit(id) {
      this.$router.push({ path: `/editSlider/${id}` });
    },
    getNewSts(){}
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
.slider-item {
  width: 100%;
  height: 400px;
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
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
</style>
