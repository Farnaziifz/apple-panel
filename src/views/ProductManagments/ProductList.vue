<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/addProduct/1" class="ml-2">
          <button class="btn btn-primary mb-2">
            افزودن محصول
          </button>
        </router-link>

        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="head-item">
                <fav-input
                  placeholder="جستجو بر اساس نام"
                  v-model="search"
                  @input="searchOnTable"
                />
                <div class="export">
                  <button class="btn btn-info mr-2" @click="getExport">
                    تولید خروجی
                  </button>
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
                <template slot="TableBody" v-if="productData">
                  <tr v-for="(item, index) in productData" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.count }}
                    </td>
                    <td class="image">
                      <img
                        :src="item.image_url[0].url"
                        alt=""
                        v-if="item.image_url && item.image_url.length"
                      />
                    </td>
                    <td>{{ item.price }} ریال - {{ item.discount }}</td>
                    <td>
                      {{ item.unit.name }}
                    </td>

                    <td>
                      <span
                        class="btn btn-success"
                        v-if="item.status === 'فعال'"
                        @click="chnageStatus(item.id)"
                      >
                        {{ item.status }}</span
                      >
                      <span
                        class="btn btn-danger"
                        v-if="item.status === 'غیر فعال'"
                        @click="chnageStatus(item.id)"
                      >
                        {{ item.status }}</span
                      >
                    </td>
                    <td class="operation">
                      <span @click="goToSingle(item.id)"
                        ><i class="feather icon-list"></i
                      ></span>
                      <span @click="showModal(item.id, item.name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <router-link tag="span" :to="`/unit-edit/${item.id}`"
                        ><i class="feather icon-edit"></i
                      ></router-link>
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
    <div class="vld-parent">
      <loading :active.sync="isLoading" :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script>
import { ExportToCsv } from "export-to-csv";
export default {
  data() {
    return {
      productData: null,
      isDesc: false,
      search: "",
      current: 1,
      totalpage: null,
      activePage: null,
      hasNext: null,
      hasPrev: null,
      customItemsPerPage: null,
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
          title: "تعداد",
          name: "name",
        },
        {
          title: "عکس محصول",
          name: "unit-status",
        },

        {
          title: "قیمت- میزان تخفیف",
          name: "unit-category",
        },

        {
          title: "نام واحد",
          name: "unit-name",
        },

        {
          title: "وضعیت",
          name: "status",
        },
        {
          title: "عملیات",
          name: "operation",
        },
      ],
      isLoading: false,
      options: {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "product list",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      },
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    async getProductList() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get(
        "product?page=1&product_count=2&sort=1"
      );
      if (response.responseCode === 200) {
        this.productData = response.data.data;
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
    async sendPageNumber(value) {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get(`product?page=${value}&product_count=2`);
      if (response.responseCode === 200) {
        this.productData = response.data.data;
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
    searchOnTable() {},
    goToSingle(id) {
      this.$router.push({ path: `/product/${id}` });
    },
    async chnageStatus(id) {
      const response = await this.$ApiServiceLayer.post(
        "product-status-toggle",
        { product_id: id }
      );
      if (response.responseCode === 200) {
        this.getProductList();
      }
    },
    async getExport() {
      this.isLoading = true;
      const csvExporter = new ExportToCsv(this.options);
      const response = await this.$ApiServiceLayer.get("product");
      if (response.responseCode === 200) {
        csvExporter.generateCsv(response.data);
        this.isLoading = false;
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
  justify-content: space-between;
  .btn {
    margin-right: 20px;
  }
}
.image {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.btn-danger {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
