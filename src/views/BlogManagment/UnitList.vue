<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        ``
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="filter-container">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                      <fav-dropdown
                        optionPlaceholder="انتخاب گالری"
                        :items="brandList"
                        @input="changeBrandId"
                      />
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                      <fav-dropdown
                        optionPlaceholder="انتخاب دسته بندی"
                        :items="groupList"
                        @input="changeGroupId"
                      />
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                      <fav-dropdown
                        optionPlaceholder="انتخاب نام مدیر گالری"
                        :items="groupList"
                        @input="changeGroupId"
                      />
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12">
                      <fav-dropdown
                        optionPlaceholder="وضعیت"
                        :items="groupList"
                        @input="changeGroupId"
                      />
                    </div>
                    <div class="col-lg-1 col-md-1 col-sm-1">
                      <div class="btn-filter-container">
                        <button class="filter-btn">
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
                    <div class="head-item">
                      <fav-input
                        placeholder="جستجو بر اساس نام"
                        v-model="search"
                        @input="searchOnTable"
                      />
                      <div class="btn-container btn btn btn-primary">
                        <i class="feather icon-plus"></i>
                        <span>جستجو کنید</span>
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
                <template slot="TableBody">
                  <tr v-for="(item, index) in unitList" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.last_name }}
                    </td>
                    <td>
                      <router-link
                        tag="button"
                        class="btn btn-success"
                        :to="`/unitBlogList/${item.id}`"
                      >
                        مشاهده
                      </router-link>
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
            <fav-confirm-modal
              ref="confirmForDelete"
              @onConfirm="deleteProductItem"
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
          title: "نام گالری",
          name: "unit-name",
        },
        {
          title: "نام مدیر گالری",
          name: "name",
        },

        {
          title: "عملیات",
          name: null,
        },
      ],
      unitList: [],
      isDesc: false,
      itemName: "",
      itemForDelete: null,
      search: "",
      groupList: [],
      brandList: [],
      current: 1,
      totalpage: null,
      activePage: null,
      hasNext: null,
      hasPrev: null,
      customItemsPerPage: null,
    };
  },

  created() {
    this.getUnitList();
  },
  methods: {
    async getUnitList() {
      const response = await this.$ApiServiceLayer.get("unit?q=");
      if (response.responseCode === 200) {
        this.unitList = response.data.data;
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
    sortOrder() {
      console.log("sort");
    },
    async deleteProductItem() {
      const response = await this.$ApiServiceLayer.delete(
        `unit/${this.itemForDelete}`
      );
      if (response === "deleted") {
        this.$notify({
          group: "tc",
          type: "danger",
          text: "واحد مورد نظر با موفقیت حذف شد!",
        });
        this.getUnitList();
      }
    },
    showModal(id, name) {
      this.$refs.confirmForDelete.openModal();
      this.itemForDelete = id;
      this.itemName = name;
    },
    async sendPageNumber(value) {
      this.unitList = [];
      const response = await this.$ApiServiceLayer.get(`unit?page=${value}`);
      if (response.responseCode === 200) {
        this.unitList = response.data.data;
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
    searchOnTable() {},
    changeGroupId() {},
    changeBrandId() {},
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
