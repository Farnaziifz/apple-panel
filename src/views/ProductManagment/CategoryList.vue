<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <button class="btn btn-primary mb-2" @click="openAddModal">
          افزودن دسته بندی مرجع جدید
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
                    <td>
                      <img :src="item.icon" alt="" class="image" />
                    </td>
                    <td class="operation">
                      <span @click="showModal(item._id, item.name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <span @click="openEditModal(item._id, item.name)"
                        ><i class="feather icon-edit"></i
                      ></span>
                      <router-link :to="`/subCategory/${item._id}`" tag="span"
                        ><i class="feather icon-list"></i
                      ></router-link>
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
                  <fav-file-upload label="ایکون اسلایدر" @input="getMainPic" />
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
          title: "عکس دسته بندی ",
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
      itemForDelet: null,
      iconUrl: null,
      itemForEdit: null
    };
  },

  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const response = await this.$ApiServiceLayer.get(`product-category`);
      if (response.statusCode === 200) {
        this.category = response.productCategory;
      }
    },
    openAddModal() {
      this.isEdit = false;
      this.$refs.addModal.open();
    },
    openEditModal(id, name) {
      this.isEdit = true;
      this.$refs.addModal.open();
      this.itemForEdit = id;
    },
    async getCatgeoyrSingle() {},
    async getMainPic(value) {
      let fd = new FormData();
      fd.append("image", value.files[0]);
      const response = await this.$ApiServiceLayer.post("upload", fd);
      if (response.filename) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "ایکون با موفقیت بارگذاری شد!"
        });
        this.iconUrl = `http://api.appledailystore.com/upload/${response.filename}`;
      }
    },

    async addGPCategory() {
      const response = await this.$ApiServiceLayer.post(
        "product-category/create",
        {
          name: this.gpCatName,
          icon: this.iconUrl
        }
      );
      this.$refs.addModal.close();
      this.getCategory();
    },
    async editGPCategory() {
      const response = await this.$ApiServiceLayer.put(
        `product-category/update/${this.itemForEdit}`,
        {
          name: "salam"
        }
      );
      console.log(response);
    },
    showModal(id, name) {
      this.itemName = name;
      this.itemForDelet = id;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteProductItem() {
      const response = await this.$ApiServiceLayer.delete(
        `product-category/delete/${this.itemForDelet}`
      );
      this.$notify({
        group: "tc",
        type: "danger",
        text: "دسته بندی با موفقیت حذف شد شد!"
      });
      this.$refs.confirmForDelete.closeModal();
      this.getCategory();
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
.image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
