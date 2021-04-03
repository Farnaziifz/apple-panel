<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/addAdminBlog">
          <button class="btn btn-primary mb-2">
            افزودن مقاله مجموعه
          </button>
        </router-link>
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
                <template slot="TableBody" v-if="blogList">
                  <tr v-for="(item, index) in blogList" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.title }}
                    </td>

                    <td>
                      {{ item.article_category.article[0].title }}
                    </td>

                    <td>
                      <button class="btn btn-success" v-if="item.status">
                        فعال
                      </button>
                      <button class="btn btn-danger" v-else>غیر فعال</button>
                    </td>

                    <td class="operation">
                      <router-link
                        :to="`/adminBlogSingle/${item.id}`"
                        tag="span"
                        ><i class="feather icon-list"></i
                      ></router-link>
                      <span @click="showModal(item.id, item.title)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <router-link tag="span" :to="`/editAdminBlog/${item.id}`"
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
          title: "نام مقاله",
          name: "unit-name",
        },

        {
          title: "دسته بندی مقاله	",
          name: "unit-category",
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
      blogList: null,
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
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const response = await this.$ApiServiceLayer.get("article?page=1");
      if (response.responseCode === 200) {
        this.blogList = response.data.data;
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
    sortOrder() {},
    async searchOnTable() {
      this.blogList = [];
      const response = await this.$ApiServiceLayer.get(
        `article?q=${this.search}`
      );
      if (response.responseCode === 200) {
        this.blogList = response.data.data;
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
        `article/${this.itemForDelete}`
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "danger",
          text: "مقاله مورد نظر با موفقیت حذف شد!",
        });
        this.getUserList();
      }
    },
    showModal(id, name) {
      this.$refs.confirmForDelete.openModal();
      this.itemForDelete = id;
      this.itemName = name;
    },
    async sendPageNumber(value) {
      this.blogList = [];
      const response = await this.$ApiServiceLayer.get(`article?page=${value}`);
      if (response.responseCode === 200) {
        this.blogList = response.data.data;
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
