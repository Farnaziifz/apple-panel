<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="head-container">
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
                  <tr v-for="(item, index) in userList" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.full_name }}
                    </td>
                    <td>
                      {{ item.mobile }}
                    </td>
                    <td>
                      {{ item.address }}
                    </td>
                    <td>
                      {{ item.postal_code }}
                    </td>
                    <td>
                      {{ item.mobile }}
                    </td>
                    <td>
                      {{ item.email }}
                    </td>
                    <td>
                      <button class="btn btn-success" v-if="item.status === 1">
                        فعال
                      </button>
                      <button class="btn btn-danger" v-if="item.status === 0">
                        غیرفعال
                      </button>
                    </td>
                    <td class="operation">
                      <router-link :to="`/user/${item.id}`" tag="span"
                        ><i class="feather icon-list"></i
                      ></router-link>
                      <span @click="showModal(item.id, item.full_name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <router-link tag="span" :to="`/edit-user/${item.id}`"
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
              <fav-confirm-modal
                ref="confirmForDelete"
                @onConfirm="deleteUserItem"
                :title="itemName"
                confirmTitle="حذف"
                confirmDescription="از حذف این رکورد اطمینان دارید؟"
                confirmBtn="بله حذف کن"
                cancelBtn="انصراف"
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
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "نام کاربر",
          name: "unit-name",
        },
        {
          title: "موبایل",
          name: "name",
        },
        {
          title: "شهر-استان",
          name: "unit-status",
        },

        {
          title: "آدرس - کد پستی",
          name: "unit-category",
        },

        {
          title: "شماره تماس",
          name: "phone",
        },
        {
          title: "ایمیل",
          name: "phone",
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
      userList: null,
      isDesc: false,
      itemName: "",
      itemForDelete: null,
      search: "",
      groupList: [],
      brandList: [],
      paginationModel: null,
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
    this.getUserList();
  },
  methods: {
    async getUserList() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("user?page=1");
      if (response.responseCode === 200) {
        this.userList = response.data.data;
        this.paginationModel = response;
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
      this.userList = [];
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get(`user?page=${value}`);
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
    async searchOnTable() {
      this.userList = [];
      const response = await this.$ApiServiceLayer.get(`user?q=${this.search}`);
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
      }
    },

    async deleteUserItem() {
      const response = await this.$ApiServiceLayer.delete(
        `user/${this.itemForDelete}`
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "danger",
          text: "کاربر مورد نظر با موفقیت حذف شد!",
        });
        this.getUserList();
      }
    },
    showModal(id, name) {
      this.$refs.confirmForDelete.openModal();
      this.itemForDelete = id;
      this.itemName = name;
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
