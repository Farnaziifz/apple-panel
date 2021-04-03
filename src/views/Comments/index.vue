<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <!-- <div class="head-container">
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
              </div> -->
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
                <template slot="TableBody">
                  <tr v-for="(item, index) in comments" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.text }}
                    </td>
                    <td>
                      {{ item.product.name }}
                    </td>
                    <td>
                      {{ item.product.unit.name }}
                    </td>
                    <td>
                      {{ item.full_name }}
                    </td>
                    <td>
                      {{ item.rate }}
                    </td>

                    <td>
                      <button
                        class="btn btn-success"
                        v-if="item.is_active === 1"
                      >
                        فعال
                      </button>
                      <button
                        class="btn btn-danger"
                        v-if="item.is_active === 0"
                      >
                        غیرفعال
                      </button>
                    </td>
                    <td class="operation">
                      <span @click="showModal(item.id, item.full_name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <span @click="showModal(item.id, item.full_name)"
                        ><i class="feather icon-corner-up-right"></i
                      ></span>
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
export default {
  data() {
    return {
      comments: null,
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "متن کامنت",
          name: "unit-name",
        },
        {
          title: "نام محصول",
          name: "name",
        },
        {
          title: "نام واحد",
          name: "name",
        },
        {
          title: "نام کاربر",
          name: "name",
        },
        {
          title: "امتیاز",
          name: "name",
        },
        {
          title: "وضعیت",
          name: "phone",
        },

        {
          title: "عملیات",
          name: null,
        },
      ],
      current: 1,
      totalpage: null,
      activePage: null,
      hasNext: null,
      hasPrev: null,
      customItemsPerPage: null,
      isLoading: false,
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("comment?page=1");
      if (response.responseCode === 200) {
        this.comments = response.data.data;
        this.totalpage = Math.ceil(
          response.data.total / response.data.per_page
        );
        this.activePage = response.data.current_page;
        this.hasNext = response.data.next_page_url;
        this.hasPrev = response.data.prev_page_url;
        this.customItemsPerPage = response.data.per_page;
        this.isLoading = false;
      }
    },
    async sendPageNumber(value) {
      this.comments = [];
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get(`comment?page=${value}`);
      if (response.responseCode === 200) {
        this.comments = response.data.data;
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
    showModal() {},
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
