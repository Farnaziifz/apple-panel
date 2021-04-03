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
                    <div class="order-count" v-if="data">
                      <div class="bg-gradient-primary card">
                        <h5>تعداد سفارشات</h5>
                        <p v-if="data.orders_count !== null">
                          {{ data.orders_count }} سفارش
                        </p>
                        <router-link
                          class="btn-container"
                          to="/orderList"
                          tag="div"
                        >
                          لیست سفارشات
                        </router-link>
                      </div>
                      <div class="bg-gradient-light card">
                        <h5>تعداد محصولات</h5>
                        <p v-if="data.products_count">
                          {{ data.products_count }} محصول
                        </p>
                        <div class="btn-container">
                          لیست محصولات
                        </div>
                      </div>
                      <div class="bg-gradient-info card">
                        <h5>میانگین پسندیده‌ها</h5>
                        <p v-if="data.average_like">{{ data.average_like }}</p>
                        <div class="btn-container">
                          <i class="feather icon-star"></i>
                        </div>
                      </div>
                    </div>
                    <div class="price-container" v-if="data">
                      <div class="row">
                        <div class="mb-1 col-lg-4 col-md-6 col-sm-12">
                          <div class="card border border-success rounded">
                            <h6>قیمت هر گرم طلای ۱۸ عیار گالری</h6>
                            <p
                              class="bg-gradient-success mt-2 p-1 color-dark"
                              v-if="data.gold_price"
                            >
                              {{
                                data.gold_price | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                            <p
                              class="bg-gradient-success mt-2 p-1 color-dark"
                              v-else
                            >
                              {{
                                data.almas_gold_price
                                  | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                            <button
                              class="btn btn-outline-success"
                              @click="changeGoldPrice(data.almas_gold_price)"
                            >
                              تغییر قیمت
                            </button>
                          </div>
                        </div>
                        <div class=" mb-1 col-lg-4 col-md-6 col-sm-12">
                          <div class="card border border-success rounded">
                            <h6>قیمت هر گرم طلای ۲۴ عیار گالری</h6>
                            <p
                              class="bg-gradient-info mt-2 p-1 color-dark"
                              v-if="data.twenty_price"
                            >
                              {{
                                data.twenty_price
                                  | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                            <p
                              class="bg-gradient-info mt-2 p-1 color-dark"
                              v-else
                            >
                              {{
                                data.almas_twenty_price
                                  | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                            <button
                              class="btn btn-outline-info"
                              @click="
                                changeGold24Price(data.almas_twenty_price)
                              "
                            >
                              تغییر قیمت
                            </button>
                          </div>
                        </div>
                        <div class="mb-1 col-lg-4 col-md-6 col-sm-12">
                          <div class="card border border-info rounded">
                            <h6>قیمت روز هر گرم طلا</h6>
                            <p class="bg-gradient-light mt-2 p-1 color-dark">
                              {{
                                data.gold_price | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                          </div>
                        </div>
                        <div class="mb-1 col-lg-6 col-md-6 col-sm-12">
                          <div class="card border border-secondary rounded">
                            <h6>قیمت دلار گالری</h6>
                            <p
                              class="bg-gradient-dark mt-2 p-1"
                              v-if="data.dollar_price"
                            >
                              {{
                                data.dollar_price
                                  | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                            <p class="bg-gradient-dark mt-2 p-1" v-else>
                              {{
                                data.almas_dollar_price
                                  | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                            <button
                              class="btn btn-outline-dark"
                              @click="changeDollarPrice"
                            >
                              تغییر قیمت
                            </button>
                          </div>
                        </div>
                        <div class="mb-1 col-lg-6 col-md-6 col-sm-12">
                          <div class="card border border-primary rounded">
                            <h6>قیمت روز دلار</h6>
                            <p class="bg-gradient-warning mt-2 p-1 color-dark">
                              {{
                                data.dollar_price
                                  | toPersianCurrency("تومان", 0)
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product-order-container" v-if="data">
                      <div class="row">
                        <div class="col-lg-6 col-md-12 col-sm-12">
                          <div class="card border p-2">
                            <h6>محصولات پرفروش</h6>
                            <Product :products="data.top_products" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12">
                          <div class="card border p-2">
                            <h6>سفارشات باز</h6>
                            <div
                              class="item"
                              v-for="item in data.last_open_orders"
                              :key="item.id"
                            >
                              <h6>{{ item.product.name }}</h6>
                              <div class="btn btn-dark">
                                {{ item.status }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="chart-contaienr">
                          <chart-js
                            ChartBackground="info"
                            ChartType="line"
                            ChartLabel="نمودار فروش"
                            :ChartDataLabels="statics.dates"
                            :ChartData="statics.datas"
                          >
                          </chart-js>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="chart-contaienr">
                          <chart-js
                            ChartBackground="info"
                            ChartType="line"
                            ChartLabel="نمودار سفارشات"
                            :ChartDataLabels="statics.dates"
                            :ChartData="statics.datas"
                          >
                          </chart-js>
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
import Product from "./BestProduct/index";

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
  components: {
    Product,
  },
  created() {
    this.getdata();
    this.getSell();
  },
  methods: {
    async getdata() {
      const response = await this.$ApiServiceLayer.get("dashboard");
      if (response.responseCode === 200) {
        this.data = response.data;
      }
    },
    async getSell() {
      const response = await this.$ApiServiceLayer.get("sells-diagram");
      console.log(response);
      if (response.responseCode === 200) {
        this.statics = response.data;
        this.chartOptionsLine.series.data = response.data.count;
        this.chartOptionsLine.xAxis.data = response.data.date;
      }
    },
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
.order-count {
  width: 100%;
  height: 110px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  .card {
    padding: 10px;
    width: 100%;
    height: 100%;
    margin: 5px;
    p {
      margin-top: 10px;
      color: black;
      margin-bottom: 5px;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
    }
  }
}
.price-container {
  margin-top: 50px;
  width: 100%;
  display: flex;
  min-height: 180px;
  .card {
    width: 100%;
    height: 100%;
    margin: 5px;
    padding: 10px;
    margin-bottom: 20px;
    .color-dark {
      color: black;
    }
  }
}
.product-order-container {
  margin-top: 50px;
}
.item {
  border: 1px solid gray;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
