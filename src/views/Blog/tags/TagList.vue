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
                <div class="container">
                  <div class="row">
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
                    </th>
                  </tr>
                </template>
                <template slot="TableBody" v-if="keywords">
                  <tr v-for="(item, index) in keywords" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td class="operation">
                      <span
                        ><i
                          class="feather icon-trash-2"
                          @click="showModal(item.id, item.name)"
                        ></i
                      ></span>
                      <span @click="showEditModal(item.id, item.name)"
                        ><i class="feather icon-edit"></i
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: null,
      isEdit: false,
      search: "",
      keyname: null,
      itemForDelete: null,
      itemName: null,
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
          title: "نام کلمه کلیدی",
          name: "unit-name",
        },
        {
          title: "عملیات",
          name: null,
        },
      ],
    };
  },
  created() {
    this.getBlogTag();
  },
  methods: {
    async getBlogTag() {
      const response = await this.$ApiServiceLayer.get("keywords?page=1");
      if (response.responseCode === 200) {
        this.keywords = response.data.data;
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
    showModal(id, name) {
      this.itemForDelete = id;
      this.itemName = name;
      this.$refs.confirmForDelete.openModal();
    },
    showEditModal(id, name) {
      this.keyname = name;
      this.itemForEdit = id;
      this.isEdit = true;
      this.$refs.addModal.open();
    },
    searchOnTable() {},
    async editKeyname() {
      let fd = new FormData();
      fd.append("name", this.keyname);
      const response = await this.$ApiServiceLayer.post(
        `keywords/${this.itemForEdit}?_method=PUT`,
        fd
      );
      if (response.responseCode === 200) {
        this.$refs.addModal.close();
        this.isEdit = false;
        this.getBlogTag();
      }
    },

    async sendPageNumber(value) {
      this.keywords = [];
      const response = await this.$ApiServiceLayer.get(
        `keywords?page=${value}`
      );
      if (response.responseCode === 200) {
        this.keywords = response.data.data;
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
    async searchOnTable() {
      this.keywords = [];
      const response = await this.$ApiServiceLayer.get(
        `keywords?q=${this.search}`
      );
      if (response.responseCode === 200) {
        this.keywords = response.data.data;
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
    deleteUserItem() {},
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
