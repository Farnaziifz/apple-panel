<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/unit-add">
          <button class="btn btn-primary mb-2">
            افزودن واحد
          </button>
        </router-link>
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="filter-container">
                <div class="row">
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <fav-dropdown
                      optionPlaceholder="انتخاب دسته بندی"
                      :items="unitCategory"
                      @input="changeUnitCat"
                    />
                  </div>

                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <fav-dropdown
                      optionPlaceholder="وضعیت"
                      :items="unitStatus"
                      @input="changeStatus"
                    />
                  </div>
                  <div class="col-lg-2 col-md-1 col-sm-1">
                    <div class="btn-filter-container">
                      <button class="filter-btn" @click="goFilter">
                        <i class="feather icon-filter"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="head-container">
                <div class="row">
                  <div class="col-12">
                    <div class="head-item">
                      <fav-input
                        placeholder="جستجو بر اساس نام"
                        v-model="search"
                        @input="searchOnTable"
                      />
                      <!-- <div class="btn-container btn btn btn-primary">
                          <i class="feather icon-plus"></i>
                          <span>جستجو کنید</span>
                        </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <fav-table-view>
                <template slot="TableTitle">
                  <tr>
                    <th v-for="(item, index) in tableTitle" :key="index">
                      <span v-if="item.title">{{ item.title }}</span>
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
                      <button
                        class="btn btn-success"
                        v-if="item.status === 'فعال'"
                      >
                        {{ item.status }}
                      </button>
                      <button
                        class="btn btn-danger"
                        v-if="item.status === 'غیر فعال'"
                      >
                        {{ item.status }}
                      </button>
                    </td>
                    <td>
                      {{ item.unit_category.name }}
                    </td>
                    <td>
                      {{ item.phone_number }}
                    </td>

                    <td @click="toggleVitrin(item.id)">
                      <button
                        class="btn btn-success"
                        v-if="item.vitrin_status === 1"
                      >
                        در حال نمایش
                      </button>
                      <button
                        class="btn btn-danger"
                        v-if="item.vitrin_status === 0"
                      >
                        عدم نمایش
                      </button>
                    </td>
                    <td class="operation">
                      <router-link :to="`/unit-single/${item.id}`" tag="span"
                        ><i class="feather icon-list"></i
                      ></router-link>
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
          title: "نام گالری",
          name: "unit-name",
        },
        {
          title: "نام مدیر گالری",
          name: "name",
        },
        {
          title: "وضعیت واحد",
          name: "unit-status",
        },

        {
          title: "دسته بندی واحد",
          name: "unit-category",
        },

        {
          title: "شماره تماس",
          name: "phone",
        },
        {
          title: "وضعیت نمایش در ویترین",
          name: "discount",
        },
        {
          title: "عملیات",
          name: null,
        },
      ],
      isLoading: false,
      unitList: [],
      isDesc: false,
      itemName: "",
      itemForDelete: null,
      search: "",
      current: 1,
      totalpage: null,
      activePage: null,
      hasNext: null,
      hasPrev: null,
      customItemsPerPage: null,
      unitCategory: [],
      unitFiler: "",
      unitStatus: [],
      unitStsfilter: "",
    };
  },

  created() {
    this.getUnitList();
    this.getUnitCategory();
    this.getUnitStatus();
  },
  methods: {
    async getUnitCategory() {
      const response = await this.$ApiServiceLayer.get("unit_category");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.unitCategory.push({ text: item.name, value: item.id });
        });
      }
    },
    async getUnitList() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("unit?page=1");
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
        this.isLoading = false;
      }
    },
    async getUnitStatus() {
      const response = await this.$ApiServiceLayer.get("unit_status");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.unitStatus.push({ text: item.name, value: item.id });
        });
      }
    },
    async deleteProductItem() {
      const response = await this.$ApiServiceLayer.delete(
        `unit/${this.itemForDelete}`
      );
      if (response.responseCode === 200) {
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
    async searchOnTable() {
      this.unitList = [];
      const response = await this.$ApiServiceLayer.get(`unit?q=${this.search}`);
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
    changeUnitCat(value) {
      this.unitFiler = value.value;
    },
    changeStatus(value) {
      this.unitStsfilter = value.value;
    },
    async goFilter() {
      this.unitList = [];
      const response = await this.$ApiServiceLayer.get(
        `unit?unit_category_id=${this.unitFiler}&unit_status_id=${this.unitStsfilter}`
      );
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
    async sendPageNumber(value) {
      this.isLoading = true;
      this.unitList = [];
      const response = await this.$ApiServiceLayer.get(`unit?page=${value}`);
      if (response.responseCode === 200) {
        this.unitList = response.data.data;
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
    async toggleVitrin(id) {
      const response = await this.$ApiServiceLayer.post("unit-vitrin-toggle", {
        unit_id: id,
      });
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "primary",
          text: response.message,
        });
        this.getUnitList();
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
