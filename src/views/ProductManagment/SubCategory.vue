<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <button class="btn btn-primary mb-2" @click="openAddModal">
          افزودن دسته بندی جدید
        </button>
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <fav-table-view>
                <template slot="TableTitle">
                  <tr>
                    <th v-for="(item, index) in tableTitle" :key="index">
                      <span v-if="item.title">{{ item.title }}</span>
                    </th>
                  </tr>
                </template>
                <template slot="TableBody">
                  <tr v-for="(item, index) in category" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td class="operation">
                      <span @click="showModal(item._id, item.name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <span @click="openEditModal(item.id, item.name)"
                        ><i class="feather icon-edit"></i
                      ></span>
                    </td>
                  </tr>
                </template>
              </fav-table-view>
              <fav-modal ref="addModal">
                <template slot="mnx-header">
                  <h5 class="dark" v-if="isEdit">ویرایش دسته بندی</h5>
                  <h5 class="dark" v-else>دسته بندی جدید اضافه کنید</h5>
                </template>
                <template slot="mnx-body">
                  <fav-input placeholder="نام دسته بندی" v-model="gpCatName" />
                </template>
                <template slot="mnx-footer">
                  <div class="btn-container">
                    <button
                      class="btn btn-warning"
                      @click="editGPCategory"
                      v-if="isEdit"
                    >
                      ویرایش دسته بندی
                    </button>
                    <button
                      class="btn btn-success"
                      @click="addGPCategory"
                      v-else
                    >
                      افزودن دسته بندی
                    </button>
                  </div>
                </template>
              </fav-modal>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableTitle: [
        {
          title: "ردیف",
          name: "row"
        },
        {
          title: "نام دسته بندی ",
          name: "unit-name"
        },

        {
          title: "عملیات",
          name: null
        }
      ],
      category: null,
      isEdit: false,
      gpCatName: null,
      itemName: "",
      itemForDelet: null
    };
  },

  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const response = await this.$ApiServiceLayer.get(
        `product-sub-category/${this.$route.params.id}`
      );
      if (response.statusCode === 200) {
        this.category = response.subCategory;
      }
    },
    openAddModal() {
      this.isEdit = false;
      this.$refs.addModal.open();
    },
    async getGPCatItem(id) {
      const response = await this.$ApiServiceLayer.get(`category/${id}`);
      // if (response.responseCode === 200) {
      this.gpCatName = response.name;
      this.gpCatSlug = response.slug;
      // }
    },
    openEditModal(id, name) {
      this.getGPCatItem(id);
      this.itemForEdit = id;
      this.isEdit = true;
      this.$refs.addModal.open();
    },
    async editGPCategory() {
      const response = await this.$ApiServiceLayer.post(
        `category/${this.itemForEdit}?_method=PUT`,
        {
          name: this.gpCatName,
          slug: this.gpCatSlug,
          group_category_id: this.$route.params.id
        }
      );
      this.$notify({
        group: "tc",
        type: "primary",
        text: "دسته بندی با موفقیت ویرایش شد!"
      });
      this.$refs.addModal.close();
      this.isEdit = false;
      this.getCategory();
    },
    async addGPCategory() {
      const response = await this.$ApiServiceLayer.post(
        "product-sub-category/create",
        {
          name: this.gpCatName,
          category_id: this.$route.params.id
        }
      );
      this.$refs.addModal.close();
      this.getCategory();
    },
    showModal(id, name) {
      this.itemName = name;
      this.itemForDelet = id;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteProductItem() {
      const response = await this.$ApiServiceLayer.delete(
        `product-sub-category/delete/${this.itemForDelet}`
      );
      if (response.statusCode === 200) {
        this.$notify({
          group: "tc",
          type: "danger",
          text: "دسته بندی با موفقیت حذف شد شد!"
        });
        this.$refs.confirmForDelete.closeModal();
        this.getCategory();
      }
    }
  }
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
.img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
</style>
