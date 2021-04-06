<template>
  <div>
    <!-- BEGIN: Content-->
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-body">
          <div class="row" id="basic-table">
            <div class="col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <h4 class="card-title">دسترسی سریع</h4>
                    <div class="quick-access">
                      <div class="quick-item">
                        <router-link to="/addProduct/1">
                          <i class="feather icon-archive"></i>
                          <h6>افزودن محصول</h6>
                        </router-link>
                      </div>
                      <div class="quick-item">
                        <router-link to="/orderList">
                          <i class="feather icon-credit-card"></i>
                          <h6>لیست سفارشات</h6>
                        </router-link>
                      </div>
                      <div class="quick-item">
                        <router-link to="/productList">
                          <i class="feather icon-layers"></i>
                          <h6>لیست محصولات</h6>
                        </router-link>
                      </div>
                      <div class="quick-item">
                        <router-link to="/adminBlogList">
                          <i class="feather icon-file-text"></i>
                          <h6>لیست پست‌های بلاگ</h6>
                        </router-link>
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
      data: null,
      chartOptionsLine: {
        xAxis: {
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: [],
          },
        ],
        color: ["#127ac2"],
      },
      statics: [],
    };
  },

  created() {
    this.getdata();
    this.getSell();
  },
  methods: {
   
    changeDollarPrice() {},
  },
};
</script>

<style lang="scss" scoped>
.quick-access {
  width: 100%;
  min-height: 80px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  .quick-item {
    width: 100%;
    height: 100%;
    text-align: center;
    i {
      font-size: 26px;
      color: #fff;
    }
    h6 {
      margin-top: 10px;
    }
  }
}
</style>
