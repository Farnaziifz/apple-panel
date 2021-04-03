<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="filter-container">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-dropdown
                        optionPlaceholder="انتخاب گالری"
                        :items="unitlist"
                        @input="changeunits"
                      />
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                      <fav-dropdown
                        optionPlaceholder="وضعیت"
                        :items="status"
                        @input="changeStatus"
                      />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <fav-date-time-picker
                        label="انتخاب بازه سفارشات"
                        v-model="start_date"
                        :range="true"
                        @onDateSelected="getRange"
                      />
                    </div>
                    <div class="col-lg-1 col-md-1 col-sm-1">
                      <div class="btn-filter-container">
                        <button class="filter-btn" @click="getFilter">
                          <i class="feather icon-filter"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="head-container">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <div class="head-item">
                        <fav-input
                          placeholder="جستجو بر اساس نام"
                          v-model="search"
                          @input="searchOnTable"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <fav-table-view>
                <template slot="TableTitle">
                  <tr>
                    <th v-for="(item, index) in tableTitle" :key="index">
                      <span v-if="item.title">{{ item.title }}</span>
                      <i
                        class="feather icon-chevron-down"
                        @click="sortOrder(item.name)"
                        v-if="isDesc"
                      ></i>
                      <i
                        class="feather icon-chevron-up"
                        @click="sortOrder(item.name)"
                        v-else
                      ></i>
                    </th>
                  </tr>
                </template>
                <template slot="TableBody" v-if="userList">
                  <tr v-for="(item, index) in userList" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
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
                    </td>
                  </tr>
                </template>
              </fav-table-view>
              <fav-pagination
                class="mt-2"
                :customItemsPerPage="customItemsPerPage"
                :totalPage="totalpage"
                :activePage="activePage"
                :hasNext="hasNext"
                :hasPrev="hasPrev"
                @sendPageNumber="sendPageNumber"
              />
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

        {
          title: "شماره منزل سفارش دهنده	",
          name: "phone",
        },

        {
          title: "وضعیت",
          name: "phone",
        },
      ],
      userList: null,
      isDesc: false,
      itemName: "",
      itemForDelete: null,
      search: "",
      status: [],
      current: 1,
      totalpage: null,
      activePage: null,
      hasNext: null,
      hasPrev: null,
      customItemsPerPage: null,
      oredr_status: "",
      unitlist: [],
      order_unit: "",
      start_date: "",
    };
  },
  created() {
    this.getUserList();
    this.getCategory();
  },
  methods: {
    getRange(value) {
      console.log(value);
    },
    async getFilter() {
      this.userList = [];
      const response = await this.$ApiServiceLayer.get(
        `admin-order?order_count=1&order_status_id=${this.oredr_status}&unit_id=${this.order_unit}`
      );
      console.log("salam", response);
      if (response.responseCode === 200) {
        this.userList = response.data.data;
      }
    },
    async getUserList() {
      const response = await this.$ApiServiceLayer.get(
        "admin-order?page=1&order_count=1"
      );
      if (response.responseCode === 200) {
        this.userList = response.data.data;
        this.totalpage = Math.ceil(
          response.data.total / response.data.per_page
        );
        this.activePage = response.data.current_page;
        if (response.data.next_page_url) {
          this.hasNext = true;
        }

        this.hasPrev = response.data.prev_page_url;
        this.customItemsPerPage = response.data.per_page;
        this.isLoading = false;
      }
    },
    sortOrder() {},
    async searchOnTable() {
      this.userList = [];
      const response = await this.$ApiServiceLayer.get(
        `admin-order?q=${this.search}&order_count=1`
      );
      this.userList = response.data.data;
    },
    changeStatus(value) {
      this.oredr_status = value.value;
    },
    changeunits(value) {
      this.order_unit = value.value;
    },

    async getCategory() {
      const response = await this.$ApiServiceLayer.get(
        "get-order-filter-items"
      );
      if (response.responseCode === 200) {
        response.data.order_statuses.forEach((item) => {
          this.status.push({ text: item.name, value: item.id });
        });
        response.data.units.forEach((item) => {
          this.unitlist.push({ text: item.name, value: item.id });
        });
      }
    },
    async sendPageNumber(value) {
      this.isLoading = true;
      this.userList = [];
      const response = await this.$ApiServiceLayer.get(
        `admin-order?page=${value}&order_count=1`
      );
      if (response.responseCode === 200) {
        this.userList = response.data.data;
        this.isLoading = false;
        this.totalpage = Math.ceil(
          response.data.total / response.data.per_page
        );
        this.activePage = response.data.current_page;
        if (response.data.next_page_url) {
          this.hasNext = true;
        }

        this.hasPrev = response.data.prev_page_url;
        this.customItemsPerPage = response.data.per_page;
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
</style>
