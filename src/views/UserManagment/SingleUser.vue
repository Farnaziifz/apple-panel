<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card" v-if="user">
              <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>نام کامل کاربر: </span>
                    <span>{{ user.full_name }}</span>
                  </p>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>آدرس ایمیل: </span>
                    <span>{{ user.email }}</span>
                  </p>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>موبایل: </span>
                    <span>{{ user.mobile }}</span>
                  </p>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>کد پستی: </span>
                    <span>{{ user.postal_code }}</span>
                  </p>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>استان: </span>
                    <span>{{ user.province }}</span>
                  </p>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>شهر: </span>
                    <span>{{ user.city }}</span>
                  </p>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <p>
                    <span>آدرس: </span>
                    <span>{{ user.default_user_address }}</span>
                  </p>
                </div>
              </div>
              <div class="row mt-4">
                <h3>لیست سفارشات</h3>
                <fav-table-view>
                  <template slot="TableTitle">
                    <tr>
                      <th v-for="(item, index) in tableTitle" :key="index">
                        <span v-if="item.title">{{ item.title }}</span>
                      </th>
                    </tr>
                  </template>
                  <template slot="TableBody" v-if="user.orders">
                    <tr v-for="(item, index) in user.orders" :key="item.id">
                      <td>
                        {{ index + 1 }}
                      </td>
                      <!-- <td>
                        {{ item.product.name }}
                      </td>
                      <td>
                        {{ item.product.unit.name }}
                      </td>
                      <td>
                        {{ item.user.mobile }}
                      </td>
                      <td>
                        {{ item.user.postal_code }}
                      </td>
                      <td>
                        {{ item.user.home_number }}
                      </td>
                      <td>
                        {{ item.status }}
                      </td> -->
                    </tr>
                  </template>
                </fav-table-view>
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
      user: null,
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "نام محصول",
          name: "unit-name",
        },
        {
          title: "نام واحد",
          name: "name",
        },
        {
          title: "شماره همراه سفارش دهنده",
          name: "unit-status",
        },

        {
          title: "کد پستی سفارش دهنده	",
          name: "unit-category",
        },
      ],
      // orders: null,
    };
  },

  created() {
    this.getUser();
    // this.getOrders();
  },
  methods: {
    async getUser() {
      const response = await this.$ApiServiceLayer.get(
        `user/${this.$route.params.id}`
      );
      if (response.responseCode === 200) {
        this.user = response.data;
      }
      if (response.status === 401) {
        window.localStorage.removeItem("almas-admin-store");
        this.$router.push({ path: "/login" });
      }
    },
    // async getOrders() {
    //   const response = await this.$ApiServiceLayer.get(
    //     `admin-order/${this.$route.params.id}`
    //   );
    //   console.log(response);
    //   if (response.responseCode === 200) {
    //     this.orders = response.data.orders;
    //     console.log(this.orders);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 30px !important;
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
