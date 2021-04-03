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
                    <div
                      class="col-lg-3 col-md-6 col-sm-12"
                      v-for="item in menus"
                      :key="item.id"
                    >
                      <div class="menu-item">
                        <h3>{{ item.name }}</h3>
                        <div class="btns">
                          <fav-checkbox
                            :value="item.status"
                            @input="getNewSts"
                            :itemId="item.id"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: null,
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    async getMenu() {
      const response = await this.$ApiServiceLayer.get("get-menus");
      if (response.responseCode === 200) {
        this.menus = response.data;
      }
    },
    async getNewSts(value) {
      const response = await this.$ApiServiceLayer.get(
        `toggle-menu-status/${value.id}`
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "primary",
          text: "وضعیت منو مورد نظر با موفقیت به روزرسانی شد!",
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
</style>
